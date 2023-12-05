/*
  Warnings:

  - You are about to drop the column `company` on the `JobListing` table. All the data in the column will be lost.
  - Added the required column `companyName` to the `JobListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobListing" DROP COLUMN "company",
ADD COLUMN     "companyName" VARCHAR(255) NOT NULL;
