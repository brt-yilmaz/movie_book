import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "co-admin" | "admin";
  photo: string;
  likedMovies?: string[];
}

interface UserState {
  user: User | null;
  token: string | null;
  mode: "light" | "dark";
  searchQuery: string;
}

const initialState: UserState = {
  user: null,
  token: null,
  mode: "light",
  searchQuery: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ data: { user: User }; token: string }>
    ) => {
      const { id, name, email, photo, role, likedMovies } =
        action.payload.data.user;
      const filteredObj = { id, name, email, photo, role, likedMovies };
      state.user = filteredObj;
      state.token = action.payload.token;
    },

    updateUser: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.likedMovies = action.payload;
      }
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setLogin, setLogout, setMode, setSearchQuery, updateUser } =
  userSlice.actions;
export default userSlice.reducer;
