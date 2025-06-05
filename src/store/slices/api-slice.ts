import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../base-query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Nutrition",
    "User",
    "Meal",
    "Dashboard",
    "Category",
    "Product",
    "Blog",
  ],
  endpoints: () => ({}),
});
