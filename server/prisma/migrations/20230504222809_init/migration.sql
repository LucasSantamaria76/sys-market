-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('OPERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "products" (
    "barcode" VARCHAR(13) NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "stock" DECIMAL(6,2) DEFAULT 0,
    "benefit" DECIMAL(3,0),
    "cost" DECIMAL(15,5),
    "photoURL" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("barcode")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "nameProvider" VARCHAR NOT NULL,
    "address" VARCHAR(50),
    "phone" VARCHAR(15),

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_product" (
    "price_cost" DECIMAL(15,2) DEFAULT 0,
    "last_purchase" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productID" TEXT NOT NULL,
    "providerID" INTEGER NOT NULL,

    CONSTRAINT "provider_product_pkey" PRIMARY KEY ("productID","providerID")
);

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(15,2) NOT NULL,
    "paymentMethod" DECIMAL NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saleItem" (
    "saleId" INTEGER NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "productId" VARCHAR(13) NOT NULL,

    CONSTRAINT "saleItem_pkey" PRIMARY KEY ("saleId","productId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(25) NOT NULL,
    "role" "RoleStatus" NOT NULL DEFAULT 'OPERATOR',
    "password" VARCHAR NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "cashOuts" (
    "id" TEXT NOT NULL,
    "date" VARCHAR,
    "amount" DECIMAL(15,2) NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "cashOuts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_productsTopurchases" (
    "A" VARCHAR(13) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "_productsTopurchases_AB_unique" ON "_productsTopurchases"("A", "B");

-- CreateIndex
CREATE INDEX "_productsTopurchases_B_index" ON "_productsTopurchases"("B");

-- AddForeignKey
ALTER TABLE "provider_product" ADD CONSTRAINT "provider_product_productID_fkey" FOREIGN KEY ("productID") REFERENCES "products"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_product" ADD CONSTRAINT "provider_product_providerID_fkey" FOREIGN KEY ("providerID") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleItem" ADD CONSTRAINT "saleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleItem" ADD CONSTRAINT "saleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTopurchases" ADD CONSTRAINT "_productsTopurchases_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_productsTopurchases" ADD CONSTRAINT "_productsTopurchases_B_fkey" FOREIGN KEY ("B") REFERENCES "purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
