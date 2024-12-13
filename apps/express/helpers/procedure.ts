import { auth } from '../middleware/auth';
import { t } from '../trpc';

export const procedure = t.procedure.use(auth);
