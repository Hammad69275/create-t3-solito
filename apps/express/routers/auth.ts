import prisma from '@packages/prisma';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { constructAuthObject } from '../helpers/constructAuthObject';
import { procedure } from '../helpers/procedure';
import { t } from '../trpc';

const router = t.router;

export const authRouter = router({
  register: procedure
    .input(
      z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        password: z
          .string()
          .min(5, 'Password must be at least 5 characters')
          .regex(
            /[a-zA-Z0-9]/,
            'Password must contain only letters and numbers'
          )
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, name } = input;
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });
      if (user) throw new Error('User already exists');

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10)
        }
      });

      return {
        accessToken: await constructAuthObject(newUser.id)
      };
    }),
  login: procedure
    .input(
      z.object({
        email: z.string().email('Invalid email address'),
        password: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });
      if (!user) throw new Error('User not found');

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Incorrect password');
      }

      return {
        accessToken: await constructAuthObject(user.id)
      };
    }),
  refresh: procedure.meta({ authRequired: false }).query(async ({ ctx }) => {
    const accessToken = ctx.headers.authorization?.split(' ')[1];
    if (!accessToken) throw new Error('No token provided');

    const token = jwt.verify(accessToken, process.env.JWT_SECRET as string, {
      ignoreExpiration: true
    }) as unknown as { refreshToken: string } | undefined;

    if (!token)
      throw new TRPCError({ message: 'Invalid token', code: 'BAD_REQUEST' });

    const session = await prisma.session.findFirst({
      where: {
        refreshToken: token.refreshToken
      },
      select: {
        userId: true,
        revokedAt: true,
        refreshToken: true
      }
    });

    if (!session || session.revokedAt)
      throw new TRPCError({ message: 'Invalid token', code: 'BAD_REQUEST' });

    await prisma.session.update({
      where: {
        refreshToken: token.refreshToken
      },
      data: {
        revokedAt: new Date()
      }
    });

    return {
      accessToken: await constructAuthObject(session.userId)
    };
  })
});
