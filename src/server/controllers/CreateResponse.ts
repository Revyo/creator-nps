import { t } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultResponseSelect = Prisma.validator<Prisma.ResponseSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateResponse = t.procedure
  .input(
    z.object({
      npsResponse: z.number().min(1).max(10),
      contentResponse: z.number().min(1).max(10),
      feedbackResponse: z.string(),
      survey_id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    const response = await prisma.response.create({
      data: input,
      select: defaultResponseSelect,
    });
    return response;
  });
