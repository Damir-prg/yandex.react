import { describe, it, expect } from "@jest/globals";
import reducer, {
  wsOnMessage,
  wsOnConnecting,
  wsOnOpen,
  wsOnClose,
  initialState,
} from "./feedSlice";
import type { TSliceFeed } from "./feedSlice";

import mockPayload from "../testMocks/wsOrdersAll.json";

const typedMockPayload = mockPayload as Omit<TSliceFeed, "status">;

describe("feedSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать wsOnMessage", () => {
    const previousState: TSliceFeed = { ...initialState };
    const newState = reducer(previousState, wsOnMessage(typedMockPayload));

    expect(newState).toEqual({
      ...previousState,
      total: typedMockPayload.total,
      totalToday: typedMockPayload.totalToday,
      orders: typedMockPayload.orders,
    });
  });

  it("должен обрабатывать wsOnConnecting", () => {
    const previousState: TSliceFeed = {
      ...initialState,
      status: "disconnected",
    };
    const newState = reducer(previousState, wsOnConnecting());

    expect(newState).toEqual({
      ...previousState,
      status: "connecting",
    });
  });

  it("должен обрабатывать wsOnOpen", () => {
    const previousState: TSliceFeed = { ...initialState, status: "connecting" };
    const newState = reducer(previousState, wsOnOpen());

    expect(newState).toEqual({
      ...previousState,
      status: "connected",
    });
  });

  it("должен обрабатывать wsOnClose", () => {
    const previousState: TSliceFeed = { ...initialState, status: "connected" };
    const newState = reducer(previousState, wsOnClose());

    expect(newState).toEqual({
      ...previousState,
      status: "disconnected",
    });
  });
});
