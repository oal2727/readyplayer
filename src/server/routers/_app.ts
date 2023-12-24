import { router } from '../trpc';
import userRouter from './userRoute';
import voiceRouter from './voiceRouter';

export const appRouter = router({
  user:userRouter,
  voice:voiceRouter
});
export type AppRouter = typeof appRouter;