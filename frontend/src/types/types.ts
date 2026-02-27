export interface ICategory {
  name: string;
  color: string;
}

export interface ICard {
  id: string;
  title: string;
  image: string;
  cardColor: string;
  question: string;
  answer: string;
  categories: ICategory[];
  popularity: number;
  difficulty: number;
  duration: number;
}

export interface ICardsResponse {
  data: ICard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface IReview {
  id: number;
  cardId: number;
  liked: string;
  difficulty: string;
  duration: number;
}
