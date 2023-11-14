import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MovieMongoDB } from "./models/movieMongoDB";

export const moviesMongoDBApi = createApi({
  reducerPath: "movieMongoDB",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/api/v1/movies",
  }),
  tagTypes: ["MovieMongoDB"],
  endpoints: (build) => ({
    
    getMovieFromOurs: build.query({
      query: (imdbID) => ({
        url: `/${imdbID}`,
        method: "GET",
      })
    })

  }),
});

export const { useGetMovieFromOursQuery } = moviesMongoDBApi;