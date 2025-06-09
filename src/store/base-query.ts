import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    if (typeof window !== "undefined") {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Make the request
  const result = await baseQuery(args, api, extraOptions);

  // If the request fails with 401 (Unauthorized), logout the user
  if (result.error && result.error.status === 401) {
    // Import logout action and dispatch it
    const { clearCredentials } = await import("./slices/auth-slice");
    api.dispatch(clearCredentials());
  }

  return result;
};
