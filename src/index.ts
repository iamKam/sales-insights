import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/sales', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Sales Data',
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});