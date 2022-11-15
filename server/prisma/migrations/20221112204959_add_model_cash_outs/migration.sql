-- DropForeignKey
ALTER TABLE "saleItem" DROP CONSTRAINT "saleItem_productId_fkey";

-- CreateTable
CREATE TABLE "cashOuts" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "cashOuts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saleItem" ADD CONSTRAINT "saleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;
