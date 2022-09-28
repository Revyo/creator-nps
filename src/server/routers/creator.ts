import { t } from '../trpc';
import { GetCreatorByID, CreateCreator } from '../controllers';

export const creatorRouter = t.router({
  byId: GetCreatorByID,
  add: CreateCreator,
});
