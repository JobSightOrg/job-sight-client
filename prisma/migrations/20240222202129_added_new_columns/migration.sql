/*
  Warnings:

  - Added the required column `applicationStatus` to the `job_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `job_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `job_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `job_listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionTitle` to the `job_listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."job_listing" ADD COLUMN     "applicationStatus" VARCHAR(20) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "jobType" VARCHAR(20) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "positionTitle" TEXT NOT NULL;
