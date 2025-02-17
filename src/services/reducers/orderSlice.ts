import type { PayloadAction } from "@reduxjs/toolkit";
import type { TCreateOrderResponse } from "api/types/orders";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "api/index";

type TSliceOrder = {
  number: number | null;
  orderItems: Array<string>;
  loading: boolean;
  error: string | null;
  name: string | null;
};

const initialState: TSliceOrder = {
  name: null,
  error: null,
  loading: false,
  number: null,
  orderItems: [],
};

export const createOrder = createAsyncThunk(
  "ingredients/post",
  api.createOrder
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
      .addCase(createOrder.pending, (state: TSliceOrder) => {
        state.error = null;
        state.loading = true;
        state.number = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state: TSliceOrder, action: PayloadAction<TCreateOrderResponse>) => {
          if (!action.payload.success) return;

          state.loading = false;
          state.number = action.payload.order.number;
          state.name = action.payload?.name ? action.payload.name : null;
          state.error = null;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Ошибка при формирования заказа";
      });
  },
});

export const { setOrderItems } = orderSlice.actions;
export default orderSlice.reducer;
