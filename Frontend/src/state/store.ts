import { configureStore } from "@reduxjs/toolkit"; 
import { userSlice } from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }

})

export const useAppDispatch:() => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<typeof store.getState> = useSelector;
