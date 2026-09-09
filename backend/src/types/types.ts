export interface IUser {
  id: number;
  email: string;
}

export interface IYnCategory {
  id: number;
  name: string;
  color: string;
}

export interface IYnCard {
  id: number;
  nextYnCardId: number | null;
  title: string;
  image: string;
  cardColor: string;
  question: string;
  answer: string;
  categories: IYnCategory[] | [];
  liked: number;
  difficulty: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IYnReview {
  id: number;
  cardId: number;
  liked: number;
  difficulty: number;
  duration: number;
  createdAt: Date;
}
