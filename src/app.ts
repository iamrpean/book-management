import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import bookRoutes from './api/routes/book.routes';
import { errorHandler } from './middlewares/error.middleware';
import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { inputSanitizer } from './middlewares/sanitizer.middleware';

const app = express();

// Security middlewares
app.use(rateLimiter);       
app.use(inputSanitizer); 

app.use(express.json());

// Routes Book
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

app.use(errorHandler);

export default app;
