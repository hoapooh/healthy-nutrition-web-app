import { apiSlice } from "@/store/slices/api-slice";
import {
  ConfirmReviewParams,
  ConfirmReviewResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  GetAllReviewsParams,
  GetAllReviewsResponse,
} from "@/types/review";

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query<GetAllReviewsResponse, GetAllReviewsParams>({
      query: (params) => ({
        url: "/reviews",
        params,
      }),
      providesTags: ["Review"],
    }),
    getReviewById: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation<CreateReviewResponse, CreateReviewRequest>({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    updateReview: builder.mutation({
      query: ({ id, ...review }) => ({
        url: `/reviews/${id}`,
        method: "PUT",
        body: review,
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review", "Product"],
    }),
    confirmReview: builder.query<ConfirmReviewResponse, ConfirmReviewParams>({
      query: (params) => ({
        url: "/reviews/confirmation",
        params,
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useConfirmReviewQuery,
} = reviewApi;
