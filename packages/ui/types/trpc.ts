import type { inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../../../apps/express';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type User = RouterOutput['users']['me'];

export type UsersOutput = Exclude<User, undefined>[];
