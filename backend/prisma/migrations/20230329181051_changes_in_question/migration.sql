/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Quizs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `Questions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quizs_title_key" ON "Quizs"("title");
