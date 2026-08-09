/*
  Warnings:

  - You are about to drop the column `isFree` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `mock_tests` table. All the data in the column will be lost.
  - You are about to drop the column `isFree` on the `practice_sets` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AccessTier" AS ENUM ('FREE', 'PRO', 'EXCLUSIVE');

-- CreateEnum
CREATE TYPE "PurchasableItemType" AS ENUM ('MOCK_TEST', 'PRACTICE_SET', 'LESSON', 'CHAPTER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- DropForeignKey
ALTER TABLE "lesson_progress" DROP CONSTRAINT "lesson_progress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "test_attempts" DROP CONSTRAINT "test_attempts_studentId_fkey";

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "accessTier" "AccessTier" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "isFree",
ADD COLUMN     "accessTier" "AccessTier" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "mock_tests" DROP COLUMN "isFree",
ADD COLUMN     "accessTier" "AccessTier" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "practice_sets" DROP COLUMN "isFree",
ADD COLUMN     "accessTier" "AccessTier" NOT NULL DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_items" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "itemType" "PurchasableItemType" NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentGateway" TEXT NOT NULL DEFAULT 'RAZORPAY',
    "razorpayOrderId" TEXT,
    "paymentRefId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_items_productId_itemType_itemId_key" ON "product_items"("productId", "itemType", "itemId");

-- CreateIndex
CREATE INDEX "purchases_studentId_idx" ON "purchases"("studentId");

-- CreateIndex
CREATE INDEX "purchases_productId_idx" ON "purchases"("productId");

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
