import { t } from '../trpc';
import {
  GetSurveyByID,
  CreateSurvey,
  CalculateAndUpdateNPS,
} from '../controllers';

export const surveyRouter = t.router({
  byId: GetSurveyByID,
  add: CreateSurvey,
  updateNPS: CalculateAndUpdateNPS,
});
