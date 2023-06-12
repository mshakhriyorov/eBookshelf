import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { BooksState } from "./constants/booksInterfaces";
import { Meta } from "../Register/constants/registerInterfaces";

import { deleteBook, editBook, getBooks, postBook } from "../../api/books";

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
      data: response.data.data,
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
>("books/removeBook", async (id, { signal, rejectWithValue }) => {
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

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    try {
      const response = await getBooks();
      return {
        data: response.data.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.status);
      } else {
        throw error;
      }
    }
  }
);

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
        const { author, title, id } = payload.data;
        if (author && title && id) {
          state.books?.push({ ...payload.data });
          toast("You successfully added a new book into shelf");
        } else {
          toast("There is no book with this ISBN number");
        }

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
        if (payload === 500) {
          toast("This book is already in your shelf!");
        }

        state.loading = "idle";
        state.error = payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchBooks.pending.type]: (
      state,
      { meta }: PayloadAction<any, string, Meta>
    ) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      }
    },
    [fetchBooks.fulfilled.type]: (
      state,
      { payload, meta }: PayloadAction<{ data: any }, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        state.books = payload.data;

        state.loading = "idle";
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [fetchBooks.rejected.type]: (
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
    [removeBook.pending.type]: (
      state,
      { meta }: PayloadAction<any, string, Meta>
    ) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      }
    },
    [removeBook.fulfilled.type]: (
      state,
      { payload, meta }: PayloadAction<{ data: any }, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        state.books = payload.data.data;

        toast("Book deleted!");
        state.loading = "idle";
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [removeBook.rejected.type]: (
      state,
      { payload, meta }: PayloadAction<any, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        if (payload === 500) {
          toast("This book is already in your shelf!");
        }

        state.loading = "idle";
        state.error = payload;
        state.currentRequestId = undefined;
      }
    },
  },
});

// export const { increment, decrement, incrementByAmount } = BooksSlice.actions;

export const selectorGetBooks = (state: RootState) => state.books;

export default BooksSlice.reducer;
