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

export interface IYnCardResponse {
  success: boolean;
  data: IYnCard;
  meta: {
    timestamp: Date;
  };
}

export interface IYnCardsResponse {
  success: boolean;
  data: IYnCard[] | [];
  meta: {
    timestamp: Date;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface IYnDeleteCardResponse {
  success: boolean;
  data: IYnCard;
  meta: {
    timestamp: Date;
  };
}

export interface IYnCardsParams {
  page: number;
  limit: number;
  idSort: string | null;
  nameSort?: string | null;
}

export interface IYnReviewResponse {
  success: boolean;
  data: IYnReview;
  meta: {
    timestamp: Date;
  };
}

export interface IYnReviewsResponse {
  success: boolean;
  data: IYnReview[];
  meta: {
    timestamp: Date;
  };
}

export interface IYnCategoriesResponse {
  success: boolean;
  data: IYnCategory[];
  meta: {
    timestamp: Date;
  };
}

export interface ApiError {
  success: boolean;
  error: {
    code: number;
    codeTitle: string;
    message?: string;
    details?: unknown;
  };
  meta: {
    timestamp: Date;
  };
}

export interface IAdminLoginResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: Date;
  };
}

export interface IAdminLogoutResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: Date;
  };
}

export interface IAdminRefreshResponse {
  success: boolean;
  data: null;
  meta: {
    timestamp: Date;
  };
}

export interface IAdminMeResponse {
  success: boolean;
  data: {
    id: number;
    email: string;
  };
  meta: {
    timestamp: Date;
  };
}
