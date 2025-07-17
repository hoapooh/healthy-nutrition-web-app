import { apiSlice } from "@/store/slices/api-slice";
import {
  GetAllOrdersParams,
  GetAllOrdersResponse,
  GetOrderByCodeParams,
  GetOrderByCodeResponse,
  GetOrderByUserResponse,
  UpdateOrderStatusBody,
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
    getOrderByUser: builder.query<GetOrderByUserResponse, void>({
      query: () => ({
        url: "orders/by-user",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<
      { message: string },
      UpdateOrderStatusBody
    >({
      query: (body) => ({
        url: "orders/update-status",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByCodeQuery,
  useGetOrderByUserQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
