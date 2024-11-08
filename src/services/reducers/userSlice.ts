import { createSlice } from "@reduxjs/toolkit";

import type { TAuthResponse } from "api/types";
import type { PayloadAction } from "@reduxjs/toolkit";

type TSliceUser = {
  user: TAuthResponse["user"] | null;
  isAuth: boolean;
};

const initialState: TSliceUser = {
  isAuth: false,
  user: null,
};

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
});

export const { resetStore, setAuthStatus, setUser } = userSlice.actions;
export default userSlice.reducer;
