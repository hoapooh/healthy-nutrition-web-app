import { apiSlice } from "@/store/slices/api-slice";
import {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => "accounts/profile",
      providesTags: ["User"],
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "authentication/register",
        method: "POST",
        body: userData,
      }),
    }),
    changePassword: builder.mutation<
      void,
      { oldPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (passwords) => ({
        url: "authentication/change-password",
        method: "POST",
        body: passwords,
      }),
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useChangePasswordMutation,
} = authApi;
