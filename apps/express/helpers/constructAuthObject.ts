import prisma from '@packages/prisma';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const constructAuthObject = async (userId: number) => {
  const token = await prisma.session.create({
    data: {
      userId
    },
    select: {
      refreshToken: true
    }
  });

  const payload: JwtPayload = {
    refreshToken: token.refreshToken
  };

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5m'
  });

  return accessToken;
};
