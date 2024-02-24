-- AlterTable
ALTER TABLE "next_auth"."users" ADD COLUMN "hashedPassword" TEXT;

-- AlterTable
ALTER TABLE "public"."job_listing" RENAME CONSTRAINT "JobListing_pkey" TO "job_listing_pkey";
