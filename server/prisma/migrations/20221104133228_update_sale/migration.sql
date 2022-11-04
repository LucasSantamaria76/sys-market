/*
  Warnings:

  - Added the required column `date` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL;
