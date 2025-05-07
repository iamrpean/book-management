import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import bookRoutes from './api/routes/book.routes';

const app = express();

app.use(express.json());

// Books
app.use('/api/v1/books', bookRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello Worldd');
});

app.get('/ping', (_req, res) => {
  const mongoStatus = mongoose.connection.readyState;

  res.json({
    status: 'ok',
    mongo: mongoStatus === 1 ? 'connected' : 'disconnected'
  });
});

export default app;
