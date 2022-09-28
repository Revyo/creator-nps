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
const defaultCreatorSelect = Prisma.validator<Prisma.CreatorSelect>()({
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
});

export const GetCreatorByID = t.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const { id } = input;
    const creator = await prisma.creator.findUnique({
      where: { id },
      select: defaultCreatorSelect,
    });
    if (!creator) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No creator with id '${id}'`,
      });
    }
    return creator;
  });
