-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "actualPrice" INTEGER,
    "sellingPrice" INTEGER NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "type" VARCHAR(50),
    "vendor" VARCHAR(50),
    "collection" VARCHAR(50),
    "tags" JSONB,
    "quantity" INTEGER,
    "variants" JSONB,
    "specifications" JSONB,
    "status" VARCHAR(50),
    "sku" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(255),
    "policies" JSONB,
    "services" JSONB,
    "offers" JSONB,
    "coupons" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReviews" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255),
    "productId" VARCHAR(255) NOT NULL DEFAULT '',
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_uuid_key" ON "Products"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ProductReviews_uuid_key" ON "ProductReviews"("uuid");
