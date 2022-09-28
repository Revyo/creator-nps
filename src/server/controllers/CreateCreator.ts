import { t } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultCreatorSelect = Prisma.validator<Prisma.CreatorSelect>()({
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
});

export const CreateCreator = t.procedure
  .input(
    z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  )
  .mutation(async ({ input }) => {
    const creator = await prisma.creator.create({
      data: input,
      select: defaultCreatorSelect,
    });
    return creator;
  });
