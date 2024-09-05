import { BASE_URL } from "@/constants.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
BASE_URL;

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Products", "Users", "Orders"],
  endpoints: (builder) => ({}),
});
