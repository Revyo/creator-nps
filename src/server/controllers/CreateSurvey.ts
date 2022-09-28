import { t } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultSurveySelect = Prisma.validator<Prisma.SurveySelect>()({
  id: true,
  npsQuestion: true,
  creator_id: true,
  contentQuestion: true,
  feedbackQuestion: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateSurvey = t.procedure
  .input(
    z.object({
      id: z.string().uuid().optional(),
      creator_id: z.string().uuid(),
      stage: z.enum(['OPEN', 'IN_REVIEW', 'COMPLETED']).optional().nullable(),
      distributedPlatform: z.enum([
        'YOUTUBE',
        'PATREON',
        'TIKTOK',
        'INSTAGRAM',
      ]),
      npsQuestion: z.string().min(1).max(10),
      contentQuestion: z.string().min(1).max(10),
      endDate: z.date(),
      feedbackQuestion: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const survey = await prisma.survey.create({
      data: input,
      select: defaultSurveySelect,
    });
    return survey;
  });
