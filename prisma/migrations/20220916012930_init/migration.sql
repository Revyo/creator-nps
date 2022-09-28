-- CreateEnum
CREATE TYPE "STAGES" AS ENUM ('OPEN', 'IN_REVIEW', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PLATFORM" AS ENUM ('YOUTUBE', 'PATREON', 'TIKTOK', 'INSTAGRAM');

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "stage" "STAGES" NOT NULL,
    "distributedPlatform" "PLATFORM" NOT NULL,
    "npsQuestion" TEXT NOT NULL,
    "contentQuestion" TEXT NOT NULL,
    "feedbackQuestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "npsResponse" INTEGER NOT NULL,
    "contentResponse" INTEGER NOT NULL,
    "feedbackResponse" INTEGER NOT NULL,
    "sentimentAnalysis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
