import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

app.get('/ping', (_req, res) => {
  const mongoStatus = mongoose.connection.readyState;

  res.json({
    status: 'ok',
    mongo: mongoStatus === 1 ? 'connected' : 'disconnected'
  });
});

export default app;
