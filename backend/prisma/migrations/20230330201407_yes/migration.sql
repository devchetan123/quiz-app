/*
  Warnings:

  - Added the required column `title` to the `Answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "title" VARCHAR(255) NOT NULL;
