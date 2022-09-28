import { t } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Survey.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultSurveySelect = Prisma.validator<Prisma.SurveySelect>()({
  id: true,
  npsQuestion: true,
  contentQuestion: true,
  feedbackQuestion: true,
  createdAt: true,
  updatedAt: true,
});

export const GetSurveyByID = t.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const { id } = input;
    const survey = await prisma.survey.findUnique({
      where: { id },
      select: defaultSurveySelect,
    });
    if (!survey) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No survey with id '${id}'`,
      });
    }
    return survey;
  });
