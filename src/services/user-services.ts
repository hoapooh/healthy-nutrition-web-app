import { apiSlice } from "@/store/slices/api-slice";
import {
  CreateUserBody,
  CreateUserResponse,
  GetAllUsersParams,
  GetAllUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "@/types/auth";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccounts: builder.query<GetAllUsersResponse, GetAllUsersParams>({
      query: (params) => ({
        url: "/accounts",
        params,
      }),
      providesTags: ["User"],
    }),
    createAccount: builder.mutation<CreateUserResponse, CreateUserBody>({
      query: (body) => ({
        url: "/accounts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateAccount: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ params, body }) => {
        const formData = new FormData();

        // Add image files from body if provided
        if (body?.image) {
          formData.append("image", body.image);
        }

        return {
          url: "/accounts/profile",
          method: "PUT",
          params,
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
} = userApi;
