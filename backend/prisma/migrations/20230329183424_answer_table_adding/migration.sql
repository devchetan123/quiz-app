-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "questionId" VARCHAR(255) NOT NULL DEFAULT '',
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answers_uuid_key" ON "Answers"("uuid");
