import express from 'express';
import dotenv from 'dotenv';
import salesRoutes from './routes/sales';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/sales', salesRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});