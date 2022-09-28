-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "accessCode" TEXT,
ADD COLUMN     "contentDescription" TEXT,
ADD COLUMN     "contentScore" TEXT,
ADD COLUMN     "detractorPercent" DOUBLE PRECISION,
ADD COLUMN     "npsDescription" TEXT,
ADD COLUMN     "npsScore" TEXT,
ADD COLUMN     "passivePercent" DOUBLE PRECISION,
ADD COLUMN     "promoterPercent" DOUBLE PRECISION;
