/*
  Warnings:

  - You are about to drop the `Addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Addresses";

-- DropTable
DROP TABLE "ProductReviews";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "Quizs" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "Quizs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "type" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quizId" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quizs_uuid_key" ON "Quizs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_uuid_key" ON "Questions"("uuid");
