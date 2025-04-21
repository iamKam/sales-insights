import { SaleRecord } from '../types/sales';

export function computeInsights(sales: SaleRecord[]) {
  const totalsByCategory: Record<string, number> = {};
  let totalSales = 0;

  for (const s of sales) {
    totalsByCategory[s.category] = (totalsByCategory[s.category] || 0) + s.amount;
    totalSales += s.amount;
  }

  const bestCategory = Object.entries(totalsByCategory)
    .sort((a, b) => b[1] - a[1])[0][0];
  const averageSale = totalSales / sales.length;

  return { totalsByCategory, totalSales, averageSale, bestCategory };
}