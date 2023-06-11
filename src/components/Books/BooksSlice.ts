import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BooksState } from "./constants/booksInterfaces";
import { Meta } from "../Register/constants/registerInterfaces";

import { deleteBook, editBook, postBook } from "../../api/books";

import { RootState } from "../../app/store";

export const addBook = createAsyncThunk<
  { isbn: { isbn: string } },
  { isbn: string },
  {
    rejectValue: number;
    signal: AbortSignal;
  }
>("books/addBook", async (isbn, { signal, rejectWithValue }) => {
  const source = axios.CancelToken.source();
  signal.addEventListener("abort", () => {
    source.cancel();
  });
  try {
    const response = await postBook(isbn, {
      cancelToken: source.token,
    });
    return {
      isbn,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.status);
    } else {
      throw error;
    }
  }
});

export const updateBook = createAsyncThunk<
  { bookData: { status: number; id: number } },
  { status: number; id: number },
  {
    rejectValue: number;
    signal: AbortSignal;
  }
>("books/updateBook", async (bookData, { signal, rejectWithValue }) => {
  const source = axios.CancelToken.source();
  signal.addEventListener("abort", () => {
    source.cancel();
  });
  try {
    const response = await editBook(bookData, {
      cancelToken: source.token,
    });
    return {
      bookData,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.status);
    } else {
      throw error;
    }
  }
});

export const removeBook = createAsyncThunk<
  { id: { id: number } },
  { id: number },
  {
    rejectValue: number;
    signal: AbortSignal;
  }
>("books/addBook", async (id, { signal, rejectWithValue }) => {
  const source = axios.CancelToken.source();
  signal.addEventListener("abort", () => {
    source.cancel();
  });
  try {
    const response = await deleteBook(id, {
      cancelToken: source.token,
    });
    return {
      id,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.status);
    } else {
      throw error;
    }
  }
});

const initialState: BooksState = {
  books: [],
  bookId: null,
  loading: "idle",
  error: null,
  currentRequestId: undefined,
};

export const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    [addBook.pending.type]: (
      state,
      { meta }: PayloadAction<any, string, Meta>
    ) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      }
    },
    [addBook.fulfilled.type]: (
      state,
      { payload, meta }: PayloadAction<{ data: any }, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        state.books = [{ ...payload.data }];

        state.loading = "idle";
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [addBook.rejected.type]: (
      state,
      { payload, meta }: PayloadAction<any, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        state.loading = "idle";
        state.error = payload;
        state.currentRequestId = undefined;
      }
    },
  },
});

// export const { increment, decrement, incrementByAmount } = BooksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selector = (state: RootState) => state.books;

export default BooksSlice.reducer;
