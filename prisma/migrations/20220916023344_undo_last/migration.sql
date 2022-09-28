/*
  Warnings:

  - Made the column `distributedPlatform` on table `Survey` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "distributedPlatform" SET NOT NULL;
