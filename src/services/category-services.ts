import { apiSlice } from "@/store/slices/api-slice";
import {
  CategoryParams,
  CategoryResponse,
  CreateCategoryBody,
  DeleteCategoryParams,
  UpdateCategoryBody,
} from "@/types/category";

const categoryServices = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse, CategoryParams>({
      query: (params) => ({
        url: "/categories",
        params: params,
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<void, CreateCategoryBody>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<void, UpdateCategoryBody>({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<void, DeleteCategoryParams>({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryServices;
