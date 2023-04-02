/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Addresses" ADD COLUMN     "uuid" VARCHAR(255);

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "uuid" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Addresses_uuid_key" ON "Addresses"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_uuid_key" ON "Users"("uuid");
