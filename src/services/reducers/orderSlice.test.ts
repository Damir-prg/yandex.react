import { describe, it, expect, jest } from "@jest/globals";
import reducer, {
  createOrder,
  setOrderItems,
  initialState,
} from "./orderSlice";
import type { TSliceOrder } from "./orderSlice";
import type { TCreateOrderResponse } from "api/types/orders";

import order from "../testMocks/order.json";

jest.mock("api/index", () => ({
  api: {
    createOrder: jest.fn(),
  },
}));

const typedOrderResponse = order as TCreateOrderResponse;

const mockFailedOrderResponse: TCreateOrderResponse = {
  success: false,
  // @ts-expect-error
  name: null,
  order: {
    number: 0,
  },
};

describe("orderSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать setOrderItems и устанавливать orderItems", () => {
    const previousState: TSliceOrder = { ...initialState };
    const orderItems = ["item1", "item2"];
    const newState = reducer(previousState, setOrderItems(orderItems));

    expect(newState).toEqual({
      ...previousState,
      orderItems,
    });
  });

  it("должен обрабатывать createOrder.pending", () => {
    const previousState: TSliceOrder = {
      ...initialState,
      number: 999,
      error: "старая ошибка",
    };
    const newState = reducer(previousState, { type: createOrder.pending.type });

    expect(newState).toEqual({
      ...previousState,
      loading: true,
      error: null,
      number: null,
    });
  });

  it("должен обрабатывать createOrder.fulfilled и обновлять данные при success: true", () => {
    const previousState: TSliceOrder = {
      ...initialState,
      loading: true,
    };
    const newState = reducer(previousState, {
      type: createOrder.fulfilled.type,
      payload: typedOrderResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      loading: false,
      number: typedOrderResponse.success ? typedOrderResponse.order.number : 0,
      name: typedOrderResponse.success ? typedOrderResponse.name : "",
      error: null,
    });
  });

  it("должен обрабатывать createOrder.fulfilled и не обновлять данные при success: false", () => {
    const previousState: TSliceOrder = {
      ...initialState,
      loading: true,
      number: 999,
      name: "старое имя",
    };
    const newState = reducer(previousState, {
      type: createOrder.fulfilled.type,
      payload: mockFailedOrderResponse,
    });

    expect(newState).toEqual({
      ...previousState,
    });
  });

  it("должен обрабатывать createOrder.rejected и устанавливать пользовательскую ошибку", () => {
    const previousState: TSliceOrder = {
      ...initialState,
      loading: true,
    };
    const errorMessage = "Ошибка сети";
    const newState = reducer(previousState, {
      type: createOrder.rejected.type,
      error: { message: errorMessage },
    });

    expect(newState).toEqual({
      ...previousState,
      loading: false,
      error: errorMessage,
    });
  });

  it("должен обрабатывать createOrder.rejected с дефолтной ошибкой при отсутствии сообщения", () => {
    const previousState: TSliceOrder = {
      ...initialState,
      loading: true,
    };
    const newState = reducer(previousState, {
      type: createOrder.rejected.type,
      error: {},
    });

    expect(newState).toEqual({
      ...previousState,
      loading: false,
      error: "Ошибка при формирования заказа",
    });
  });
});
