-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_providerId_fkey";

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
