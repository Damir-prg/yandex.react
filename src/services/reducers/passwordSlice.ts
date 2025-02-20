import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "api/index";

export type TPasswordSlice = {
  isMailSend: boolean;
  successReset: boolean;
};

export const initialState: TPasswordSlice = {
  isMailSend: false,
  successReset: false,
};

export const forgotPassword = createAsyncThunk("forgot", api.forgotPassword);
export const resetPassword = createAsyncThunk("reset", api.resetPassword);

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isMailSend = false;
      state.successReset = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, payload) => {
      if (payload.payload.success) {
        state.isMailSend = true;
        return;
      }
      state.isMailSend = false;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.isMailSend = false;
    });

    // reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.isMailSend = true;
      state.successReset = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, payload) => {
      if (payload.payload.success) {
        state.isMailSend = false;
        state.successReset = true;
        return;
      }
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isMailSend = true;
      state.successReset = false;
    });
  },
});

export default passwordSlice.reducer;
