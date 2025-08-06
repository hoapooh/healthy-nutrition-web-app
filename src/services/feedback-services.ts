import { apiSlice } from "@/store/slices/api-slice";
import {
  Feedback,
  FeedbackListReponse,
  FeedbackParams,
} from "@/types/feedback";

const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query<FeedbackListReponse, FeedbackParams>({
      query: (params) => ({
        url: "feedbacks",
        params,
      }),
      providesTags: ["Feedback"],
    }),
    getFeedbackById: builder.query({
      query: (id) => ({
        url: `feedbacks/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Feedback", id }],
    }),
    createFeedback: builder.mutation<void, Feedback>({
      query: (newFeedback) => ({
        url: "feedbacks",
        method: "POST",
        body: newFeedback,
      }),
      invalidatesTags: ["Feedback"],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedbacks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetAllFeedbacksQuery,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetFeedbackByIdQuery,
} = feedbackApi;
