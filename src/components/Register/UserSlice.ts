import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { RootState } from "../../app/store";

import { getMe, postRegister } from "../../api/user";

import {
  Meta,
  RegisterState,
  RegisterData,
} from "./constants/registerInterfaces";

export const registerUser = createAsyncThunk<
  { registrationData: RegisterData },
  RegisterData,
  {
    rejectValue: number;
    signal: AbortSignal;
  }
>(
  "user/registerUser",
  async (registrationData, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    try {
      const response = await postRegister(registrationData, {
        cancelToken: source.token,
      });
      return {
        registrationData,
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
  }
);

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    try {
      const response = await getMe();
      return {
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
  }
);

const initialState: RegisterState = {
  registrationData: {
    id: 0,
    email: "",
    key: "",
    name: "",
    secret: "",
  },
  userMe: {
    email: "",
    name: "",
    id: null,
  },
  isRegistered: false,
  loading: "idle",
  error: null,
  currentRequestId: undefined,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteAccount: (state) => {
      state = initialState;
      localStorage.removeItem("register");
    },
  },
  extraReducers: {
    [registerUser.pending.type]: (
      state,
      { meta }: PayloadAction<any, string, Meta>
    ) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      }
    },
    [registerUser.fulfilled.type]: (
      state,
      { payload, meta }: PayloadAction<{ data: any }, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        state.registrationData = payload.data.data;
        state.isRegistered = true;

        localStorage.setItem(
          "register",
          JSON.stringify({
            ...payload.data.data,
          })
        );

        state.loading = "idle";
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [registerUser.rejected.type]: (
      state,
      { payload, meta }: PayloadAction<any, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        if (payload === 500) {
          toast("This user ID is already taken!");
        }
        state.loading = "idle";
        state.error = payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchMe.pending.type]: (
      state,
      { meta }: PayloadAction<any, string, Meta>
    ) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      }
    },
    [fetchMe.fulfilled.type]: (
      state,
      { payload, meta }: PayloadAction<{ data: any }, string, Meta>
    ) => {
      if (
        state.loading === "pending" &&
        state.currentRequestId === meta.requestId
      ) {
        state.userMe = payload.data.data;

        state.loading = "idle";
        state.currentRequestId = undefined;
        state.error = null;
      }
    },
    [fetchMe.rejected.type]: (
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

export const { deleteAccount } = UserSlice.actions;

export const selectorGetMyself = (state: RootState) => state.user;

export default UserSlice.reducer;
