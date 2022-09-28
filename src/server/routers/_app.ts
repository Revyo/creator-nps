/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc';
import { healthRouter } from './health';
import { surveyRouter } from './survey';
import { creatorRouter } from './creator';
import { responseRouter } from './response';

export const appRouter = t.router({
  survey: surveyRouter,
  creator: creatorRouter,
  response: responseRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
