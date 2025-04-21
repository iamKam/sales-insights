import axios, { AxiosError } from 'axios';

/**
 * Calls OpenAI to generate a human-readable summary of computed metrics.
 * Implements retry with exponential backoff on 429 rate‐limit errors.
 */
export async function generateSummary(
  metrics: any,
  retries = 3,
  backoffMs = 1000
): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('AI service error: Missing OPENAI_API_KEY environment variable');
  }

  const prompt = `Generate a concise summary of these sales metrics: ${JSON.stringify(metrics)}`;
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a sales insights assistant.' },
      { role: 'user', content: prompt }
    ]
  };

  try {
    const resp = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    )
    return resp.data.choices?.[0]?.message?.content.trim() ?? '';
  } catch (err) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status;
    const errorDetail = axiosErr.response?.data || axiosErr.message;

    // Retry on rate limit (429)
    if (status === 429 && retries > 0) {
      console.warn(`Rate limit hit, retrying in ${backoffMs}ms... (${retries} retries left)`);
      await new Promise((res) => setTimeout(res, backoffMs));
      return generateSummary(metrics, retries - 1, backoffMs * 2);
    }

    // For all other errors, propagate with details
    throw new Error(`AI service error (status ${status}): ${JSON.stringify(errorDetail)}`);
  }
}

import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({ error: err.message });
}