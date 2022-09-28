/*
  Warnings:

  - Added the required column `endDate` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "sentimentAnalysis" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
