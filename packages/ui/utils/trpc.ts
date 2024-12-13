import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TRPCLink } from '@trpc/client';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';

import type { AppRouter } from '../../../apps/express/index';
import eventEmitter from '../helpers/eventEmitter';
import Toast from '../helpers/toast/toast';

const url =
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:3000';

export const customLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        async error(err) {
          //check if invalid token
          if (err.message.includes('Invalid token')) {
            return eventEmitter.emit('logout');
          }
          //refresh check
          if (err.message.includes('expired')) {
            const { accessToken } = await client.auth.refresh.query();
            await AsyncStorage.setItem('token', accessToken);
            const retry = next(op).subscribe({
              next(value) {
                observer.next(value);
                retry.unsubscribe();
              },
              error() {
                observer.error(err);
                retry.unsubscribe();
              },
              complete() {
                observer.complete();
                retry.unsubscribe();
              }
            });
          } else {
            // validation errors
            const validationErrors = err.data?.zodError?.fieldErrors;
            let message;
            if (validationErrors) {
              const errors = Object.values(validationErrors).flat();
              message = errors[0];
            } else message = err.message;
            Toast.error(message as string);
            observer.error(err);
          }
        },
        complete() {
          observer.complete();
        }
      });
      return unsubscribe;
    });
  };
};

export const client = createTRPCClient<AppRouter>({
  links: [
    customLink,
    httpBatchLink({
      url: `${url}/trpc`,
      async headers() {
        const token = await AsyncStorage.getItem('token');
        return token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {};
      }
    })
  ]
});
