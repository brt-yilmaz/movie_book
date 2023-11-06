import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieDetailsApi = createApi({
  reducerPath: "movieDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/movie",
  }),
  tagTypes: ["MovieDetail"],
  endpoints: (build) => ({
    getMovieDetails: build.query({
      query: (id) => ({
        url: `/${id}?append_to_response=credits`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }),
      providesTags: ["MovieDetail"],
    }),
  }),
});

export const { useGetMovieDetailsQuery } = movieDetailsApi;
