export interface IYnCategory {
  id: number;
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
  categories: IYnCategory[] | [];
  liked: number;
  difficulty: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface IYnCardsResponse {
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

export interface IYnCardsParams {
  page: number;
  limit: number;
  sort: string;
}

export interface IYnReview {
  id: number;
  cardId: number;
  liked: number;
  difficulty: number;
  duration: number;
  createdAt: string;
}

export interface IYnReviewResponse {
  id: number;
  cardId: number;
  liked: number;
  difficulty: number;
  duration: number;
  createdAt: string;
}

export interface ApiError {
  error: string;
}

export interface IAdminLoginResponse {
  success: boolean;
}

export interface IAdminLogoutResponse {
  success: boolean;
}

export interface IAdminRefreshResponse {
  success: boolean;
}

export interface IAdminMeResponse {
  id: number;
  email: string;
}
