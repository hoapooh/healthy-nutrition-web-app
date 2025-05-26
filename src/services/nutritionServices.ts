import { apiSlice } from "@/store/slices/api-slice";

// Define types for our nutrition data
export interface NutritionData {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number;
  servingUnit: string;
}

export interface NutritionResponse {
  data: NutritionData[];
  total: number;
  page: number;
  limit: number;
}

export const nutritionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all nutrition items with pagination
    getNutritionItems: builder.query<
      NutritionResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "nutrition",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Nutrition"],
    }),

    // Get a single nutrition item by ID
    getNutritionById: builder.query<NutritionData, string>({
      query: (id) => `nutrition/${id}`,
      providesTags: (result, error, id) => [{ type: "Nutrition", id }],
    }),

    // Add a new nutrition item
    addNutritionItem: builder.mutation<NutritionData, Partial<NutritionData>>({
      query: (body) => ({
        url: "nutrition",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Nutrition"],
    }),

    // Update a nutrition item
    updateNutritionItem: builder.mutation<
      NutritionData,
      { id: string; data: Partial<NutritionData> }
    >({
      query: ({ id, data }) => ({
        url: `nutrition/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Nutrition", id }],
    }),

    // Delete a nutrition item
    deleteNutritionItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `nutrition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Nutrition"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetNutritionItemsQuery,
  useGetNutritionByIdQuery,
  useAddNutritionItemMutation,
  useUpdateNutritionItemMutation,
  useDeleteNutritionItemMutation,
} = nutritionApi;
