-- CreateTable
CREATE TABLE "JobListing" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobListing_pkey" PRIMARY KEY ("id")
);

