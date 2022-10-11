import { t } from '../trpc';
import {
  GetCreatorByID,
  CreateCreator,
  GetCreators,
  GetSurveyByCreatorID,
} from '../controllers';

export const creatorRouter = t.router({
  byId: GetCreatorByID,
  add: CreateCreator,
  GetAll: GetCreators,
  GetSurveys: GetSurveyByCreatorID,
});
