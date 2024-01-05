/*
  Warnings:

  - Made the column `date` on table `sale` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sale" ALTER COLUMN "date" SET NOT NULL;
