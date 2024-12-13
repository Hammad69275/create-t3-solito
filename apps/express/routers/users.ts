import prisma from '@packages/prisma';
import { z } from 'zod';

import { procedure } from '../helpers/procedure';
import { t } from '../trpc';

const router = t.router;

export const usersRouter = router({
  getUsers: procedure
    .input(
      z.object({
        page: z.number()
      })
    )
    .meta({ authRequired: true })
    .query(async ({ input }) => {
      const users = await prisma.user.findMany({
        skip: input.page * 10,
        take: 10
      });
      return users;
    }),
  me: procedure.meta({ authRequired: true }).query(({ ctx }) => {
    if (!ctx.user) return;
    return {
      name: ctx.user.name,
      email: ctx.user.email,
      createdAt: ctx.user.createdAt
    };
  })
});
