/*
  Warnings:

  - You are about to drop the column `card_id` on the `card_to_categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `card_to_categories` table. All the data in the column will be lost.
  - You are about to drop the column `card_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `card_color` on the `yes_no_cards` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `yes_no_cards` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `yes_no_cards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardId,categoryId]` on the table `card_to_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardId` to the `card_to_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `card_to_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardColor` to the `yes_no_cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "card_to_categories" DROP CONSTRAINT "card_to_categories_card_id_fkey";

-- DropForeignKey
ALTER TABLE "card_to_categories" DROP CONSTRAINT "card_to_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_card_id_fkey";

-- DropIndex
DROP INDEX "card_to_categories_card_id_category_id_key";

-- DropIndex
DROP INDEX "card_to_categories_card_id_idx";

-- DropIndex
DROP INDEX "card_to_categories_category_id_idx";

-- DropIndex
DROP INDEX "idx_reviews_card_id";

-- AlterTable
ALTER TABLE "card_to_categories" DROP COLUMN "card_id",
DROP COLUMN "category_id",
ADD COLUMN     "cardId" INTEGER NOT NULL,
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "card_id",
DROP COLUMN "created_at",
ADD COLUMN     "cardId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "yes_no_cards" DROP COLUMN "card_color",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "cardColor" VARCHAR(7) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "card_to_categories_cardId_idx" ON "card_to_categories"("cardId");

-- CreateIndex
CREATE INDEX "card_to_categories_categoryId_idx" ON "card_to_categories"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "card_to_categories_cardId_categoryId_key" ON "card_to_categories"("cardId", "categoryId");

-- CreateIndex
CREATE INDEX "idx_reviews_card_id" ON "reviews"("cardId");

-- AddForeignKey
ALTER TABLE "card_to_categories" ADD CONSTRAINT "card_to_categories_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "yes_no_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_to_categories" ADD CONSTRAINT "card_to_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "yes_no_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
