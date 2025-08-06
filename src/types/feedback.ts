export interface Feedback {
  id: string;
  content: string;
}

export interface FeedbackListReponse {
  message: string;
  result: {
    items: Feedback[];
    totalCount: number;
  };
}

export interface FeedbackParams {
  pageIndex?: number;
  limit?: number;
}
