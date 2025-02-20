import { describe, it, expect, jest } from "@jest/globals";
import reducer, {
  forgotPassword,
  resetPassword,
  initialState,
} from "./passwordSlice";
import type { TPasswordSlice } from "./passwordSlice";

jest.mock("api/index", () => ({
  api: {
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

const mockSuccessResponse = {
  success: true,
};

const mockFailedResponse = {
  success: false,
};

describe("passwordSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать forgotPassword.pending", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: true,
      successReset: true,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
      successReset: false,
    });
  });

  it("должен обрабатывать forgotPassword.fulfilled при success: true", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: false,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.fulfilled.type,
      payload: mockSuccessResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: true,
    });
  });

  it("должен обрабатывать forgotPassword.fulfilled при success: false", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: true,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
    });
  });

  it("должен обрабатывать forgotPassword.rejected", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: true,
    };
    const newState = reducer(previousState, {
      type: forgotPassword.rejected.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
    });
  });

  it("должен обрабатывать resetPassword.pending", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: false,
      successReset: true,
    };
    const newState = reducer(previousState, {
      type: resetPassword.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: true,
      successReset: false,
    });
  });

  it("должен обрабатывать resetPassword.fulfilled при success: true", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: true,
      successReset: false,
    };
    const newState = reducer(previousState, {
      type: resetPassword.fulfilled.type,
      payload: mockSuccessResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      isMailSend: false,
      successReset: true,
    });
  });

  it("должен обрабатывать resetPassword.fulfilled при success: false", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: true,
      successReset: false,
    };
    const newState = reducer(previousState, {
      type: resetPassword.fulfilled.type,
      payload: mockFailedResponse,
    });

    expect(newState).toEqual({
      ...previousState,
    });
  });

  it("должен обрабатывать resetPassword.rejected", () => {
    const previousState: TPasswordSlice = {
      ...initialState,
      isMailSend: true,
      successReset: true,
    };
    const newState = reducer(previousState, {
      type: resetPassword.rejected.type,
    });

    expect(newState).toEqual({
      ...previousState,
      successReset: false,
    });
  });
});
