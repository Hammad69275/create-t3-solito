import type { User } from '@packages/prisma';
import { initTRPC } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { ZodError } from 'zod';

interface Meta {
  authRequired: boolean;
}
export const createContext = ({ req }: CreateHTTPContextOptions) => ({
  headers: req.headers,
  user: null
});

export const t = initTRPC
  .context<{
    user: User | null;
    headers: CreateHTTPContextOptions['req']['headers'];
  }>()
  .meta<Meta>()
  .create({
    errorFormatter(opts) {
      const { shape, error } = opts;
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null
        }
      };
    }
  });
