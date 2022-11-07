/*
  Warnings:

  - You are about to drop the column `role` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "role",
ADD COLUMN     "password" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
ADD COLUMN     "role" "RoleStatus" NOT NULL DEFAULT 'OPERATOR';
