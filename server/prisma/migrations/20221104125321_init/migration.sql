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
    "date" VARCHAR(8),

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

-- AddForeignKey
ALTER TABLE "provider_product" ADD CONSTRAINT "provider_product_productID_fkey" FOREIGN KEY ("productID") REFERENCES "products"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_product" ADD CONSTRAINT "provider_product_providerID_fkey" FOREIGN KEY ("providerID") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleItem" ADD CONSTRAINT "saleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleItem" ADD CONSTRAINT "saleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("barcode") ON DELETE SET NULL ON UPDATE CASCADE;
