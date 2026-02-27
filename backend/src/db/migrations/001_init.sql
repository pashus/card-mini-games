CREATE TABLE IF NOT EXISTS yes_no_cards (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  card_color VARCHAR(7) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS card_categories (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  card_id INTEGER NOT NULL REFERENCES yes_no_cards(id) ON DELETE CASCADE,
  name VARCHAR(20) NOT NULL,
  color VARCHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  card_id INTEGER NOT NULL REFERENCES yes_no_cards(id) ON DELETE CASCADE,
  liked VARCHAR(10) NOT NULL CHECK (liked IN ('yes', 'no', 'meh')),
  difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('low', 'medium', 'hard')),
  duration INTEGER NOT NULL CHECK (duration BETWEEN 1 AND 60),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_card_categories_card_id ON card_categories(card_id);
CREATE INDEX IF NOT EXISTS idx_reviews_card_id ON reviews(card_id);
