import type { TUpdateResponse } from "api/types";
import type { TAuthResponse } from "api/types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "api/index";
import { setCookie } from "utils/cookie";
import { refreshToken } from "api/request";
import { TFeedOrderItem } from "api/types/feed";

type TSliceUser = {
  user: TAuthResponse["user"] | null;
  initLoading: boolean;
  isAuth: boolean;
  ordersLoading: boolean;
  orders: Array<TFeedOrderItem>;
  wsStatus: "connected" | "disconnected" | "connecting";
};

const initialState: TSliceUser = {
  isAuth: false,
  user: null,
  initLoading: true,
  ordersLoading: true,
  orders: [],
  wsStatus: "disconnected",
};

export const initUser = createAsyncThunk("user/init", refreshToken);
export const loginUser = createAsyncThunk("user/login", api.login);
export const registerUser = createAsyncThunk("user/register", api.register);
export const logoutUser = createAsyncThunk("user/logout", api.logout);

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
    wsOnMessage(state, action: PayloadAction<Omit<TSliceUser, "wsStatus">>) {
      state.orders = action.payload.orders;
      state.ordersLoading = false;
    },
    wsOnConnecting(state) {
      state.wsStatus = "connecting";
    },
    wsOnOpen(state) {
      state.wsStatus = "connected";
    },
    wsOnClose(state) {
      state.wsStatus = "disconnected";
    },
  },
  extraReducers: (builder) => {
    // init user
    builder.addCase(initUser.pending, (state) => {
      state.isAuth = false;
      state.user = null;
      state.initLoading = true;
    });
    // @ts-expect-error
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

export const {
  resetStore,
  setAuthStatus,
  setUser,
  wsOnClose,
  wsOnConnecting,
  wsOnMessage,
  wsOnOpen,
} = userSlice.actions;
export default userSlice.reducer;
