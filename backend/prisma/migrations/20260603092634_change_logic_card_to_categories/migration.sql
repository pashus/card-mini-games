/*
  Warnings:

  - You are about to drop the `card_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "card_categories" DROP CONSTRAINT "card_categories_card_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_card_id_fkey";

-- DropTable
DROP TABLE "card_categories";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "color" VARCHAR(7) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_to_categories" (
    "card_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "card_to_categories_card_id_idx" ON "card_to_categories"("card_id");

-- CreateIndex
CREATE INDEX "card_to_categories_category_id_idx" ON "card_to_categories"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "card_to_categories_card_id_category_id_key" ON "card_to_categories"("card_id", "category_id");

-- AddForeignKey
ALTER TABLE "card_to_categories" ADD CONSTRAINT "card_to_categories_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "yes_no_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_to_categories" ADD CONSTRAINT "card_to_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "yes_no_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
