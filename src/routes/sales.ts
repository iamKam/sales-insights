import { Router, Request, Response, NextFunction } from 'express';
import { computeInsights } from '../services/analyticsService';
import { generateSummary } from '../services/aiService';
import { validateSales } from '../middleware/validateSales';

const router = Router();

router.post(
  '/insights',
  validateSales as any,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sales = req.body;
      const metrics = computeInsights(sales);
      const summary = await generateSummary(metrics);
      res.json({ metrics, summary });
    } catch (err) {
      next(err);
    }
  }
);

export default router;