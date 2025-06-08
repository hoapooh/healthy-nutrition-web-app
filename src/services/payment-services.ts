import { apiSlice } from "@/store/slices/api-slice";
import {
  CreatePaymentLinkBody,
  CreatePaymentLinkResponse,
} from "@/types/order";

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentLink: builder.mutation<
      CreatePaymentLinkResponse,
      CreatePaymentLinkBody
    >({
      query: (body) => ({
        url: "orders/create-payment-link",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useCreatePaymentLinkMutation } = paymentApi;
