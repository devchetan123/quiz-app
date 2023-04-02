/*
  Warnings:

  - You are about to drop the column `firstname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Users` table. All the data in the column will be lost.
  - Added the required column `emailId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "emailId" VARCHAR(255) NOT NULL,
ADD COLUMN     "firstName" VARCHAR(50),
ADD COLUMN     "gender" VARCHAR(10),
ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ADD COLUMN     "lastName" VARCHAR(50),
ADD COLUMN     "middleName" VARCHAR(50),
ADD COLUMN     "mobileNumber" VARCHAR(255) NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "customerName" VARCHAR(50) NOT NULL,
    "mobileNumber" VARCHAR(255) NOT NULL,
    "altmobileNumber" VARCHAR(255),
    "pinCode" INTEGER NOT NULL,
    "locality" VARCHAR(255),
    "address" VARCHAR(255) NOT NULL,
    "addressType" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "landmark" VARCHAR(50),

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);
