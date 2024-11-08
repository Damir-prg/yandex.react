import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsApi } from "api/index";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TOrderResponse } from "api/types";

type TSliceOrder = {
  order: TOrderResponse["order"] | null;
  orderItems: Array<string>;
  loading: boolean;
  error: string | null;
  name: string | null;
};

const initialState: TSliceOrder = {
  name: null,
  error: null,
  loading: false,
  order: null,
  orderItems: [],
};

export const postOrder = createAsyncThunk(
  "ingredients/post",
  ingredientsApi.postOrder
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderItems(
      state: TSliceOrder,
      action: PayloadAction<TSliceOrder["orderItems"]>
    ) {
      state.orderItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state: TSliceOrder) => {
        state.error = null;
        state.loading = true;
        state.order = null;
      })
      .addCase(
        postOrder.fulfilled,
        (state: TSliceOrder, action: PayloadAction<TOrderResponse>) => {
          state.loading = false;
          state.order = action.payload.order;
          state.name = action.payload?.name ? action.payload.name : null;
          state.error = null;
        }
      )
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Ошибка при формирования заказа";
      });
  },
});

export const { setOrderItems } = orderSlice.actions;
export default orderSlice.reducer;
