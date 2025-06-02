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
    const token = (getState() as RootState).auth.token;
    // const token =
    //   "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjY4MzA3M2E1NTQ1ZTAyNDBhOTkxZWQ4YSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDkwODIzMTYzNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N0cmVldGFkZHJlc3MiOiJ0ZXN0IiwiSW1hZ2UiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kb2ZubjdzYngvaW1hZ2UvdXBsb2FkL3YxNzMwMDk3ODgzLzYwZDVkYzQ2N2I5NTBjNWNjYzhjZWQ5NV9zcG90aWZ5LWZvci1hcnRpc3RzX29uNG1lOS5qcGciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1MTEyMzYzNn0.0P_bqzQKxeTqVAQEMPdTDvyJs3tWk-IzloW8iwUZD6U";
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
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
