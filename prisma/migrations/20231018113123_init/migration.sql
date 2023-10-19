/*
  Warnings:

  - Added the required column `suggestion` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "suggestion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "location" TEXT;
