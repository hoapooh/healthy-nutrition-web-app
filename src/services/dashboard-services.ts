import { apiSlice } from "@/store/slices/api-slice";
import {
  AccountRegisterCountParams,
  AccountRegisterCountResponse,
  DashboardData,
  TransactionByDateParams,
  TransactionByDateResponse,
} from "@/types/dashboard";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "dashboards",
      providesTags: ["Dashboard"],
    }),
    getAccountRegisterCount: builder.query<
      AccountRegisterCountResponse[],
      AccountRegisterCountParams
    >({
      query: (params) => ({
        url: "dashboards/account-register-counting",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
    getTransactionsByDate: builder.query<
      TransactionByDateResponse[],
      TransactionByDateParams
    >({
      query: (params) => ({
        url: "dashboards/transactions-by-day",
        params,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetAccountRegisterCountQuery,
  useGetTransactionsByDateQuery,
} = dashboardApi;
