/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" VARCHAR NOT NULL,
ADD COLUMN     "photoURL" VARCHAR;

-- DropTable
DROP TABLE "Profile";
