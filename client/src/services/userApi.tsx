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
  }),
});

export const { useGetUserQuery, useAddRemoveFriendMutation } = userApi;
