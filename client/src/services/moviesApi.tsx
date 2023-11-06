import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/search/movie?query=",
  }),
  tagTypes: ["Movies"],
  endpoints: (build) => ({
    getMovies: build.query({
      query: (searchQuery) => ({
        url: `${searchQuery}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ["Movies"],
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
