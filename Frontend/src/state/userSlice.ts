import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string
  email: string;
  role: 'user'| 'co-admin' | 'admin';
  photo: string; 
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
  searchQuery: ""
} 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ data: { user: User }, token: string }>) => {
      const {id, name, email,photo,role} = action.payload.data.user;
      const filteredObj = {id, name, email, photo, role};
      state.user = filteredObj
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    }
   
  }
})

export const { setLogin, setLogout, setMode, setSearchQuery } = userSlice.actions;
export default userSlice.reducer