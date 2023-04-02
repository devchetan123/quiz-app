/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobileNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_emailId_key" ON "Users"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_mobileNumber_key" ON "Users"("mobileNumber");
