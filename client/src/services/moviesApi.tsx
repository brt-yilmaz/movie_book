import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  tagTypes: ["Movies", "PopularMovies"],
  endpoints: (build) => ({
    getMovies: build.query({
      query: (searchQuery) => ({
        url: `/search/movie?query=${searchQuery}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ["Movies"],
    }),
    getPopularMovies: build.query({
      query: () => ({
        url: "/movie/popular",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ["PopularMovies"],
      
    }),
   

  }),
});

export const { useGetMoviesQuery, useGetPopularMoviesQuery  } = moviesApi;
