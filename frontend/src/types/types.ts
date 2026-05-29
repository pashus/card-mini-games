export interface IYnCategory {
  name: string;
  color: string;
}

export interface IYnCard {
  id: string;
  nextYnCardId: string | null;
  title: string;
  image: string;
  cardColor: string;
  question: string;
  answer: string;
  categories: IYnCategory[];
  popularity: number;
  difficulty: number;
  duration: number;
}

export interface ICardsResponse {
  data: IYnCard[] | [];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface IYnReview {
  id: number;
  cardId: number;
  liked: string;
  difficulty: string;
  duration: number;
}
