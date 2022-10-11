import { t } from '../trpc';
import {
  GetSurveyByID,
  CreateSurvey,
  CalculateAndUpdateNPS,
  GetResponseBySurveyID,
} from '../controllers';

export const surveyRouter = t.router({
  byId: GetSurveyByID,
  add: CreateSurvey,
  calculateNPS: CalculateAndUpdateNPS,
  getSurveyResponses: GetResponseBySurveyID,
});
