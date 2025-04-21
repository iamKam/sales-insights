import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { SaleRecord } from '../types/sales';

const saleSchema = Joi.object<SaleRecord>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  product: Joi.string().required(),
  category: Joi.string().required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().iso().required(),
  state: Joi.string().required()
});

export function validateSales(req: Request, res: Response, next: NextFunction) {
  const { error } = Joi.array().items(saleSchema).validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map(d => d.message) });
  }
  next();
}