import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL+ "/api/v1",
  credentials: "include",
})


export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({
    isLoggedIn: builder.query({
      query: () => ({
        url: "/auth/isLoggedIn",
        method: "POST",
      }),
    })
  })
})

export const { useIsLoggedInQuery } = apiSlice