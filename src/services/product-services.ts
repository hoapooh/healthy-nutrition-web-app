import { apiSlice } from "@/store/slices/api-slice";
import {
  CreateProductRequest,
  CreateProductResponse,
  GetProductByIdParams,
  GetProductByIdResponse,
  GetProductsParams,
  GetProductsResponse,
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
        query: (id) => `products/${id}`,
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

        return {
          url: "products",
          method: "POST",
          params,
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
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
