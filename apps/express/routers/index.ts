import { t } from '../trpc';
import { authRouter } from './auth';
import { usersRouter } from './users';

const router = t.router;

export const appRouter = router({
  users: usersRouter,
  auth: authRouter
});
