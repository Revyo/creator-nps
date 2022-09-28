import { t } from '../trpc';
import { CreateResponse } from '../controllers';

export const responseRouter = t.router({
  add: CreateResponse,
});
