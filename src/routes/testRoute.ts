import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router: Router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.send('Hello, Task Manager!');
});

router.get('/healthCheck', async (req: Request, res: Response): Promise<void> => {
  try {
    await mongoose.connection.db?.admin().ping();
    res.status(200).send('Health Check: Database is reachable!');
  } catch (error) {
    res.status(500).send('Health Check: Database is not reachable!');
  }
});

export default router;
