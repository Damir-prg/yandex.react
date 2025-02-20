import { describe, it, expect, jest } from "@jest/globals";
import reducer, { loadIngredients, initialState } from "./ingredientsSlice";
import type { TSliceIngredients } from "./ingredientsSlice";
import type { TIngredient, TIngredientResponse } from "api/types/ingredients";

jest.mock("api/index", () => ({
  api: {
    getIngredients: jest.fn(),
  },
}));

import ingredients from "../testMocks/ingredients.json";

const mockIngredientsResponse = ingredients as TIngredientResponse;

const expectedIngredientsHash: Record<string, TIngredient> =
  mockIngredientsResponse.success
    ? mockIngredientsResponse.data.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {} as Record<string, TIngredient>)
    : {};

describe("ingredientsSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать loadIngredients.pending", () => {
    const previousState: TSliceIngredients = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      loading: false,
    };
    const newState = reducer(previousState, {
      type: loadIngredients.pending.type,
    });

    expect(newState).toEqual({
      ...previousState,
      loading: true,
      error: null,
    });
  });

  it("должен обрабатывать loadIngredients.fulfilled и обновлять данные", () => {
    const previousState: TSliceIngredients = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      loading: true,
    };
    const newState = reducer(previousState, {
      type: loadIngredients.fulfilled.type,
      payload: mockIngredientsResponse,
    });

    expect(newState).toEqual({
      ...previousState,
      loading: false,
      ingredients: mockIngredientsResponse.success
        ? mockIngredientsResponse.data
        : [],
      ingredientsHash: expectedIngredientsHash,
    });
  });

  it("должен обрабатывать loadIngredients.rejected и устанавливать ошибку", () => {
    const previousState: TSliceIngredients = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      loading: true,
    };
    const errorMessage = "Ошибка сети";
    const newState = reducer(previousState, {
      type: loadIngredients.rejected.type,
      error: { message: errorMessage },
    });

    expect(newState).toEqual({
      ...previousState,
      loading: false,
      error: errorMessage,
    });
  });

  it("должен обрабатывать loadIngredients.rejected с дефолтной ошибкой при отсутствии сообщения", () => {
    const previousState: TSliceIngredients = {
      error: null,
      ingredients: [],
      ingredientsHash: {},
      loading: true,
    };
    const newState = reducer(previousState, {
      type: loadIngredients.rejected.type,
      error: {},
    });

    expect(newState).toEqual({
      ...previousState,
      loading: false,
      error: "Ошибка при загрузке данных",
    });
  });
});
