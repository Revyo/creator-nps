import { t } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Survey.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const GetResponseBySurveyID = t.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const { id } = input;
    const response = await prisma.survey.findUnique({
      where: { id },
      include: {
        response: { where: { survey_id: id } },
      },
    });
    if (!response) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No response with survey id '${id}'`,
      });
    }
    return response;
  });
