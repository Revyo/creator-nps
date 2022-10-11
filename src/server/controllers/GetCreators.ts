import { t } from '../trpc';
import { Prisma } from '@prisma/client';
import { prisma } from '~/server/prisma';

const defaultSurveySelect = Prisma.validator<Prisma.CreatorSelect>()({
  id: true,
  email: true,
  name: true,
  createdAt: true,
  updatedAt: true,
});

export const GetCreators = t.procedure.query(async () => {
  const creators = await prisma.creator.findMany({
    select: defaultSurveySelect,
  });

  return creators;
});
