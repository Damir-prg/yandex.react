import { configureStore } from "@reduxjs/toolkit";

import { feedWsMiddleware } from "../middlewares/feedMiddleware";

import rootReducer, { type RootState } from "./root";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(feedWsMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
export default store;
