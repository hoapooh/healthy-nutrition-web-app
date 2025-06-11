export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// GET
export interface GetAllReviewsResponse {
  message: string;
  result: {
    items: Review[];
    totalCount: number;
  };
}

export interface GetAllReviewsParams {
  productId?: string;
  userId?: string;
  rating?: number;
  comment?: string;
  pageIndex?: number;
  limit?: number;
}

export interface ConfirmReviewResponse {
  message: boolean;
}

export interface ConfirmReviewParams {
  userId: string;
  productId: string;
}

// POST
export interface CreateReviewRequest {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export interface CreateReviewResponse {
  message: string;
}
