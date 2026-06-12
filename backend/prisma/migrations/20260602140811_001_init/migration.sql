-- CreateTable
CREATE TABLE "card_categories" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "color" VARCHAR(7) NOT NULL,

    CONSTRAINT "card_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "liked" VARCHAR(10) NOT NULL,
    "difficulty" VARCHAR(10) NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yes_no_cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "card_color" VARCHAR(7) NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "yes_no_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_card_categories_card_id" ON "card_categories"("card_id");

-- CreateIndex
CREATE INDEX "idx_reviews_card_id" ON "reviews"("card_id");

-- AddForeignKey
ALTER TABLE "card_categories" ADD CONSTRAINT "card_categories_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "yes_no_cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "yes_no_cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
