/*
  Warnings:

  - Changed the type of `availability` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceAvailability" AS ENUM ('Available', 'Upcoming');

-- AlterTable
ALTER TABLE "services" DROP COLUMN "availability",
ADD COLUMN     "availability" "ServiceAvailability" NOT NULL;
