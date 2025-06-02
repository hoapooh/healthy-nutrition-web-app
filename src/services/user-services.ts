import { apiSlice } from "@/store/slices/api-slice";
import {
  CreateUserBody,
  CreateUserResponse,
  GetAllUsersParams,
  GetAllUsersResponse,
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
  }),
});

export const { useGetAllAccountsQuery, useCreateAccountMutation } = userApi;
