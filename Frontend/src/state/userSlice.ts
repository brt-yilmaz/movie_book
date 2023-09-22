import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string
  email: string;
  role: 'user'| 'co-admin' | 'admin';
  photo: string; 
  token: string;
}

interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
} 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ data: { user: User }, token: string }>) => {
      state.user = action.payload.data.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setLogin } = userSlice.actions;
export default userSlice.reducer