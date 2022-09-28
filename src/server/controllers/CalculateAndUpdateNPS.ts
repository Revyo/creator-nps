import { t } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const SurveyNPSSelect = Prisma.validator<Prisma.SurveySelect>()({
  id: true,
  npsScore: true,
  promoterPercent: true,
  detractorPercent: true,
  passivePercent: true,
  createdAt: true,
  updatedAt: true,
});

export const CalculateAndUpdateNPS = t.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const { id } = input;
    const surveyResponses = await prisma.response.findMany({
      where: {
        survey_id: { equals: id },
      },
    });

    const uniqueScoreCount: any = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    };

    const groupCount = {
      detractors: 0,
      passives: 0,
      promoters: 0,
    };
    let total = 0;
    surveyResponses.forEach((res) => {
      // step 1: count up total for each group; detractors, passives, and promoters
      uniqueScoreCount[res.npsResponse] += 1;
      total += 1;
      if (res.npsResponse > 0 && res.npsResponse <= 6) {
        groupCount.detractors += 1;
      } else if (res.npsResponse >= 7 && res.npsResponse <= 8) {
        groupCount.passives += 1;
      } else {
        groupCount.promoters += 1;
      }
    });

    // step 2: find percentage of each group
    const detractorPercent = (groupCount.detractors / total) * 100;
    const passivePercent = (groupCount.passives / total) * 100;
    const promoterPercent = (groupCount.promoters / total) * 100;
    // step 3: subtract detractor from promoter
    const finalNPSScore = (promoterPercent - detractorPercent).toString();

    const updatedSurvey = await prisma.survey.update({
      where: { id },
      data: {
        npsScore: finalNPSScore,
        promoterPercent,
        passivePercent,
        detractorPercent,
      },
      select: SurveyNPSSelect,
    });
    return updatedSurvey;
  });
