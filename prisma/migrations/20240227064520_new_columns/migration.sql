/*
  Warnings:

  - Made the column `location` on table `job_listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `positionTitle` on table `job_listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."job_listing" ADD COLUMN     "applied" TIMESTAMP(3),
ADD COLUMN     "interview" TIMESTAMP(3),
ADD COLUMN     "offer" TIMESTAMP(3),
ADD COLUMN     "screen" TIMESTAMP(3),
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "positionTitle" SET NOT NULL;

-- CreateIndex
CREATE INDEX "email_idx" ON "public"."job_listing"("email");
