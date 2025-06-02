import { apiSlice } from "@/store/slices/api-slice";
import { DashboardData } from "@/types/dashboard";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => "dashboards",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
