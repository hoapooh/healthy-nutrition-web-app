import { apiSlice } from "@/store/slices/api-slice";
import {
  CreateProductRequest,
  CreateProductResponse,
  GetProductByIdParams,
  GetProductByIdResponse,
  GetProductsParams,
  GetProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "@/types/product";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsParams>({
      query: (params) => ({
        url: "products",
        params,
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query<GetProductByIdResponse, GetProductByIdParams>(
      {
        query: (params) => `products/${params.id}`,
        providesTags: (result, error, { id }) => [{ type: "Product", id }],
      },
    ),
    createProduct: builder.mutation<
      CreateProductResponse,
      CreateProductRequest
    >({
      query: ({ params, body }) => {
        const formData = new FormData();

        // Add image file from body
        if (body.imageProduct) {
          body.imageProduct.forEach((file) => {
            formData.append("imageProduct", file);
          });
        }

        // Create URLSearchParams to handle array serialization properly
        const searchParams = new URLSearchParams();

        // Handle arrays specially
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              searchParams.append(key, item.toString());
            });
          } else {
            searchParams.append(key, value.toString());
          }
        });

        return {
          url: `products?${searchParams.toString()}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      UpdateProductResponse,
      UpdateProductRequest
    >({
      query: ({ id, params, body }) => {
        const formData = new FormData();

        // Add image files from body if provided
        if (body?.imageProduct) {
          body.imageProduct.forEach((file) => {
            formData.append("imageProduct", file);
          });
        }

        // Create URLSearchParams to handle array serialization properly
        const searchParams = new URLSearchParams();

        // Handle arrays specially
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              searchParams.append(key, item.toString());
            });
          } else {
            searchParams.append(key, value.toString());
          }
        });

        return {
          url: `products/${id}?${searchParams.toString()}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
