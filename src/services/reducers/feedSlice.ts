import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFeedOrderItem } from "api/types/feed";

type TSliceFeed = {
  total: number | null;
  totalToday: number | null;
  status: "connected" | "disconnected" | "connecting";
  orders: Array<TFeedOrderItem>;
};

const initialState: TSliceFeed = {
  orders: [],
  status: "disconnected",
  total: null,
  totalToday: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    wsOnMessage: (state, action: PayloadAction<Omit<TSliceFeed, "status">>) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    },
    wsOnConnecting: (state) => {
      state.status = "connecting";
    },
    wsOnOpen: (state) => {
      state.status = "connected";
    },
    wsOnClose: (state) => {
      state.status = "disconnected";
    },
  },
});

export const { wsOnMessage, wsOnClose, wsOnConnecting, wsOnOpen } =
  feedSlice.actions;
export default feedSlice.reducer;
