import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { messagesSlice } from "./messagesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userApi } from "../services/userApi";

import { movieDetailsApi } from "../services/movieDetailsApi";
import { moviesApi } from "../services/moviesApi";
import {apiSlice} from "../state/apiSlice";
import { moviesMongoDBApi } from "../services/movieMongoDBApi";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  messages: messagesSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [movieDetailsApi.reducerPath]: movieDetailsApi.reducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [moviesMongoDBApi.reducerPath]: moviesMongoDBApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(movieDetailsApi.middleware)
      .concat(moviesApi.middleware)
      .concat(apiSlice.middleware)
      .concat(moviesMongoDBApi.middleware),

    });

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
