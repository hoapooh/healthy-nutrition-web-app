import { apiSlice } from "@/store/slices/api-slice";
import { Feedback } from "@/types/feedback";

const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query({
      query: () => ({
        url: "feedbacks",
      }),
      providesTags: ["Feedback"],
    }),
    getFeedbackById: builder.query({
      query: (id) => ({
        url: `feedbacks/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Feedback", id }],
    }),
    CreateFeedback: builder.mutation<void, Feedback>({
      query: (newFeedback) => ({
        url: "feedbacks",
        method: "POST",
        body: newFeedback,
      }),
      invalidatesTags: ["Feedback"],
    }),
    DeleteFeedback: builder.mutation({
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
