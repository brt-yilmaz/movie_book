import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { messagesSlice } from "./messagesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userApi } from "../services/userApi";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { movieDetailsApi } from "../services/movieDetailsApi";
import { moviesApi } from "../services/moviesApi";
import {apiSlice} from "../state/apiSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  messages: messagesSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [movieDetailsApi.reducerPath]: movieDetailsApi.reducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(movieDetailsApi.middleware)
      .concat(moviesApi.middleware)
      .concat(apiSlice.middleware),
    });

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
