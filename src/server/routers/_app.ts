import { router } from '../trpc';
import userRouter from './userRoute';

export const appRouter = router({
  user:userRouter
});
export type AppRouter = typeof appRouter;