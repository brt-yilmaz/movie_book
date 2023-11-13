import { apiSlice } from "../../state/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    isLoggedIn: builder.query({
      query: () => ({
        url: "/auth/isLoggedIn",
        method: "POST",
      }),
    })
  })
})

export const {
  useIsLoggedInQuery
} = authApiSlice