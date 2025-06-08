import { apiSlice } from "@/store/slices/api-slice";
import {
  GetAllOrdersParams,
  GetAllOrdersResponse,
  GetOrderByCodeParams,
  GetOrderByCodeResponse,
} from "@/types/order";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<GetAllOrdersResponse, GetAllOrdersParams>({
      query: (params) => ({
        url: "orders",
        params,
      }),
      providesTags: ["Order"],
    }),
    getOrderByCode: builder.query<GetOrderByCodeResponse, GetOrderByCodeParams>(
      {
        query: (params) => ({
          url: `orders/${params.code}`,
        }),
        providesTags: (result, error, params) => [
          { type: "Order", id: params.code },
        ],
      },
    ),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderByCodeQuery } = orderApi;
