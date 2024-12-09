import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, refreshToken } from "api/index";

import type { TUpdateResponse } from "api/types";
import type { TAuthResponse } from "api/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "utils/cookie";

type TSliceUser = {
  user: TAuthResponse["user"] | null;
  initLoading: boolean;
  isAuth: boolean;
};

const initialState: TSliceUser = {
  isAuth: false,
  user: null,
  initLoading: true,
};

export const initUser = createAsyncThunk("user/init", refreshToken);
export const loginUser = createAsyncThunk("authApi/login", authApi.login);
export const registerUser = createAsyncThunk(
  "authApi/register",
  authApi.register
);
export const logoutUser = createAsyncThunk("authApi/logout", authApi.logout);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: TSliceUser, action: PayloadAction<TSliceUser["user"]>) {
      state.user = action.payload;
    },
    setAuthStatus(
      state: TSliceUser,
      action: PayloadAction<TSliceUser["isAuth"]>
    ) {
      state.isAuth = action.payload;
    },
    resetStore(state: TSliceUser) {
      state.user = initialState.user;
      state.isAuth = initialState.isAuth;
    },
  },
  extraReducers: (builder) => {
    // init user
    builder.addCase(initUser.pending, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = true;
    });
    builder.addCase(
      initUser.fulfilled,
      (state: TSliceUser, action: PayloadAction<TUpdateResponse>) => {
        if (action.payload.success) {
          state.isAuth = true;
        } else {
          state.isAuth = false;
        }
        state.initLoading = false;
      }
    );
    builder.addCase(initUser.rejected, (state) => {
      state.isAuth = false;
      state.initLoading = false;
    });

    // login user
    builder.addCase(loginUser.pending, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, payload) => {
      if (!payload.payload.success) {
        state.isAuth = false;
        state.user = null;
        return;
      }

      state.isAuth = true;
      state.user = payload.payload.user;
      setCookie("accessToken", payload.payload.accessToken, 1);
      setCookie("refreshToken", payload.payload.refreshToken, 1);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    });

    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state, payload) => {
      if (!payload.payload.success) {
        state.isAuth = false;
        state.user = null;
        return;
      }

      state.isAuth = true;
      state.user = payload.payload.user;
      setCookie("accessToken", payload.payload.accessToken, 1);
      setCookie("refreshToken", payload.payload.refreshToken, 1);
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    });

    // logout user
    builder.addCase(logoutUser.pending, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, payload) => {
      if (!payload.payload.success) {
        state.isAuth = false;
        state.user = null;
        return;
      }
      state.user = initialState.user;
      state.isAuth = initialState.isAuth;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = false;
    });
  },
});

export const { resetStore, setAuthStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
