import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./models/userModel";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/api/v1/users",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: ["User"],
    }),

    addRemoveFriend: build.mutation<
      User[],
      { id: string; friendId: string; token: string }
    >({
      query: ({ id, friendId, token }) => ({
        url: `/${id}/${friendId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    likeMovie: build.mutation<User[], { imdbID: string; token: string }>({
      query: ({ imdbID, token }) => ({
        url: `/likeMovies/likeMovie/${imdbID}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddRemoveFriendMutation,
  useLikeMovieMutation,
} = userApi;
