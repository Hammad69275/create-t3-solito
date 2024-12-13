import prisma from '@packages/prisma';
import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';

import { t } from '../trpc';

export const auth = t.middleware(async ({ ctx, meta, next }) => {
  if (!meta?.authRequired)
    return next({
      ctx
    });
  const authToken = ctx.headers.authorization?.split(' ')[1];
  if (!authToken)
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  try {
    const decodedToken = jwt.verify(
      authToken,
      process.env.JWT_SECRET as string
    ) as unknown as { refreshToken: string };

    const session = await prisma.session.findUnique({
      where: {
        refreshToken: decodedToken.refreshToken
      },
      include: {
        user: true
      }
    });

    if (!session)
      throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });

    return next({
      ctx: {
        ...ctx,
        user: session.user
      }
    });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError')
      throw new TRPCError({ message: 'Token expired', code: 'UNAUTHORIZED' });
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
  }
});
