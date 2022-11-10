-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "total" DECIMAL(15,2) NOT NULL,
    "paid_purchase" BOOLEAN NOT NULL,
    "providerId" INTEGER NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_productsTopurchases" (
    "A" VARCHAR(13) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_productsTopurchases_AB_unique" ON "_productsTopurchases"("A", "B");

-- CreateIndex
CREATE INDEX "_productsTopurchases_B_index" ON "_productsTopurchases"("B");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTopurchases" ADD CONSTRAINT "_productsTopurchases_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTopurchases" ADD CONSTRAINT "_productsTopurchases_B_fkey" FOREIGN KEY ("B") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
