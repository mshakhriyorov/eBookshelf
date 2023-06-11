import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "../components/Register/UserSlice";
import BooksReducer from "../components/Books/BooksSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    books: BooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
