import { describe, it, expect, jest } from "@jest/globals";
import reducer, {
  initUser,
  loginUser,
  registerUser,
  logoutUser,
  resetStore,
  setAuthStatus,
  setUser,
  wsOnClose,
  wsOnConnecting,
  wsOnMessage,
  wsOnOpen,
  initialState,
} from "./userSlice";
import type { TSliceUser } from "./userSlice";
import type { TAuthResponse } from "api/types";

jest.mock("api/index", () => ({
  api: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
}));

jest.mock("api/request", () => ({
  refreshToken: jest.fn(),
}));

jest.mock("utils/cookie", () => ({
  setCookie: jest.fn(),
}));

import mockPayload from "../testMocks/wsOrdersAll.json";
const typedMockPayload = mockPayload as Pick<TSliceUser, "orders">;

import userData from "../testMocks/user.json";
const mockUserResponse = userData as TAuthResponse;

const mockFailedResponse = {
  success: false,
};

describe("userSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать setUser", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, setUser(mockUserResponse.user));

    expect(newState).toEqual({
      ...previousState,
      user: mockUserResponse.user,
    });
  });

  it("должен обрабатывать setAuthStatus", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, setAuthStatus(true));

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
    });
  });

  it("должен обрабатывать resetStore", () => {
    const previousState: TSliceUser = {
      ...initialState,
      isAuth: true,
      user: mockUserResponse.user,
    };
    const newState = reducer(previousState, resetStore());

    expect(newState).toEqual({
      ...previousState,
      user: initialState.user,
      isAuth: initialState.isAuth,
    });
  });

  it("должен обрабатывать wsOnMessage", () => {
    const previousState: TSliceUser = { ...initialState, ordersLoading: true };
    const newState = reducer(
      previousState,
      wsOnMessage(typedMockPayload as Omit<TSliceUser, "wsStatus">)
    );

    expect(newState).toEqual({
      ...previousState,
      orders: typedMockPayload.orders,
      ordersLoading: false,
    });
  });

  it("должен обрабатывать wsOnConnecting", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, wsOnConnecting());

    expect(newState).toEqual({
      ...previousState,
      wsStatus: "connecting",
    });
  });

  it("должен обрабатывать wsOnOpen", () => {
    const previousState: TSliceUser = {
      ...initialState,
      wsStatus: "connecting",
    };
    const newState = reducer(previousState, wsOnOpen());

    expect(newState).toEqual({
      ...previousState,
      wsStatus: "connected",
    });
  });

  it("должен обрабатывать wsOnClose", () => {
    const previousState: TSliceUser = {
      ...initialState,
      wsStatus: "connected",
    };
    const newState = reducer(previousState, wsOnClose());

    expect(newState).toEqual({
      ...previousState,
      wsStatus: "disconnected",
    });
  });

  it("должен обрабатывать initUser.pending", () => {
    const previousState: TSliceUser = { ...initialState, isAuth: true };
    const newState = reducer(previousState, { type: initUser.pending.type });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: true,
    });
  });

  it("должен обрабатывать initUser.fulfilled при success: true", () => {
    const previousState: TSliceUser = { ...initialState, initLoading: true };
    const newState = reducer(previousState, {
      type: initUser.fulfilled.type,
      payload: { success: true },
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
      initLoading: false,
    });
  });

  it("должен обрабатывать initUser.fulfilled при success: false", () => {
    const previousState: TSliceUser = { ...initialState, initLoading: true };
    const newState = reducer(previousState, {
      type: initUser.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      initLoading: false,
    });
  });

  it("должен обрабатывать initUser.rejected", () => {
    const previousState: TSliceUser = { ...initialState, initLoading: true };
    const newState = reducer(previousState, { type: initUser.rejected.type });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      initLoading: false,
    });
  });

  it("должен обрабатывать loginUser.pending", () => {
    const previousState: TSliceUser = { ...initialState, isAuth: true };
    const newState = reducer(previousState, { type: loginUser.pending.type });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it("должен обрабатывать loginUser.fulfilled при success: true", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, {
      type: loginUser.fulfilled.type,
      payload: mockUserResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
      user: mockUserResponse.user,
    });
  });

  it("должен обрабатывать loginUser.fulfilled при success: false", () => {
    const previousState: TSliceUser = {
      ...initialState,
      user: mockUserResponse.user,
    };
    const newState = reducer(previousState, {
      type: loginUser.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
    });
  });

  it("должен обрабатывать loginUser.rejected", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, { type: loginUser.rejected.type });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it("должен обрабатывать registerUser.pending", () => {
    const previousState: TSliceUser = { ...initialState, isAuth: true };
    const newState = reducer(previousState, {
      type: registerUser.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it("должен обрабатывать registerUser.fulfilled при success: true", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, {
      type: registerUser.fulfilled.type,
      payload: mockUserResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: true,
      user: mockUserResponse.user,
    });
  });

  it("должен обрабатывать registerUser.fulfilled при success: false", () => {
    const previousState: TSliceUser = {
      ...initialState,
      user: mockUserResponse.user,
    };
    const newState = reducer(previousState, {
      type: registerUser.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
    });
  });

  it("должен обрабатывать registerUser.rejected", () => {
    const previousState: TSliceUser = { ...initialState };
    const newState = reducer(previousState, {
      type: registerUser.rejected.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it("должен обрабатывать logoutUser.pending", () => {
    const previousState: TSliceUser = { ...initialState, isAuth: true };
    const newState = reducer(previousState, { type: logoutUser.pending.type });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });

  it("должен обрабатывать logoutUser.fulfilled при success: true", () => {
    const previousState: TSliceUser = {
      ...initialState,
      isAuth: true,
      user: mockUserResponse.user,
    };
    const newState = reducer(previousState, {
      type: logoutUser.fulfilled.type,
      payload: { success: true },
    });

    expect(newState).toEqual({
      ...previousState,
      user: initialState.user,
      isAuth: initialState.isAuth,
    });
  });

  it("должен обрабатывать logoutUser.fulfilled при success: false", () => {
    const previousState: TSliceUser = {
      ...initialState,
      isAuth: true,
      user: mockUserResponse.user,
    };
    const newState = reducer(previousState, {
      type: logoutUser.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
    });
  });

  it("должен обрабатывать logoutUser.rejected", () => {
    const previousState: TSliceUser = { ...initialState, isAuth: true };
    const newState = reducer(previousState, { type: logoutUser.rejected.type });

    expect(newState).toEqual({
      ...previousState,
      isAuth: false,
      user: null,
      initLoading: false,
    });
  });
});
