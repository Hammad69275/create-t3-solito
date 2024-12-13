import dotenv from 'dotenv';
dotenv.config();

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { appRouter } from './routers';
import { createContext } from './trpc';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(
  cors({
    origin(requestOrigin, callback) {
      if (
        !requestOrigin ||
        (process.env.ALLOWED_ORIGINS ?? '').split(',').includes(requestOrigin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

app.use(express.json());

morgan.token('date', () => {
  return new Date().toLocaleString();
});
app.use(morgan('[:date] :status :method :url - :response-time ms'));

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export type AppRouter = typeof appRouter;
