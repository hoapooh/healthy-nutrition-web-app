export interface DashboardData {
  totalCountUsers: number;
  totalCountFeedbacks: number;
  totalCountTransactions: number;
  totalCountRevenues: number;
}

export interface AccountRegisterCountResponse {
  date: string;
  signUpNumber: number;
}

export interface AccountRegisterCountParams {
  fromDate?: string;
  toDate?: string;
}

export interface TransactionByDateResponse {
  date: string;
  amount: number;
}

export interface TransactionByDateParams {
  fromDate?: string;
  toDate?: string;
}
