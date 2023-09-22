import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  
    changedPasswordAfter?: (JWTTimestamp: number) => boolean | undefined;
    createPasswordResetToken?: () => string | undefined;
    role?: 'user'| 'co-admin' | 'admin';
    passwordChangedAt?: Date | undefined;
    passwordResetExpires?: Date | undefined;
    
}

interface ReviewState {
  _id: string;
  rating: number;
  review: string;
  createdAt: Date;
  movie: string;
  user: string;
  }

interface AuthState {
  mode: "light" | "dark";
  user: UserState | null;
  token: string | null;
  posts: ReviewState[]; 
}



export const authSlice = createSlice({
  name: "auth",
  initialState: {
    mode: "light",
    user: null,
    token: null,
    posts: [],
  } as AuthState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ data: { user: UserState }, token: string }>) => {
      state.user = action.payload.data.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;