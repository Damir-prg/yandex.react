import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "api/index";

import type { TUpdateResponse } from "api/types";
import type { TAuthResponse } from "api/types";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { resetStore, setAuthStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
