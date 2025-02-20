import { describe, it, expect, jest } from "@jest/globals";
import reducer, {
  addSelectedIngredient,
  removeSelectedIngredient,
  setSelectedBun,
  setSelectedIngredients,
  sortSelectedIngredients,
  setViewedIngredient,
  initialState,
} from "./selectedIngredientsSlice";
import type {
  TSliceSelectedIngredients,
  TSelectedIngredientSortAction,
} from "./selectedIngredientsSlice";
import type { TIngredientResponse } from "api/types/ingredients";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

import ingredients from "../testMocks/ingredients.json";

const mockIngredientsResponse = ingredients as TIngredientResponse;

const mockIngredients = mockIngredientsResponse.success
  ? mockIngredientsResponse.data
  : [];
const [mockBun, mockIngredient1, mockIngredient2] = mockIngredients.filter(
  (item) =>
    item.type === "bun" ? item : mockIngredients[0] && mockIngredients[1]
);

describe("selectedIngredientsSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать setSelectedIngredients и устанавливать ингредиенты с __key", () => {
    const previousState: TSliceSelectedIngredients = { ...initialState };
    const ingredientsList = [mockIngredient1, mockIngredient2];
    const newState = reducer(
      previousState,
      setSelectedIngredients(ingredientsList)
    );

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [
        { ...mockIngredient1, __key: "mocked-uuid" },
        { ...mockIngredient2, __key: "mocked-uuid" },
      ],
    });
  });

  it("должен обрабатывать setSelectedBun и устанавливать булку", () => {
    const previousState: TSliceSelectedIngredients = { ...initialState };
    const newState = reducer(previousState, setSelectedBun(mockBun));

    expect(newState).toEqual({
      ...previousState,
      selectedBun: mockBun,
    });
  });

  it("должен обрабатывать setSelectedBun и сбрасывать булку в null", () => {
    const previousState: TSliceSelectedIngredients = {
      ...initialState,
      selectedBun: mockBun,
    };
    const newState = reducer(previousState, setSelectedBun(null));

    expect(newState).toEqual({
      ...previousState,
      selectedBun: null,
    });
  });

  it("должен обрабатывать setViewedIngredient и устанавливать просматриваемый ингредиент", () => {
    const previousState: TSliceSelectedIngredients = { ...initialState };
    const newState = reducer(
      previousState,
      setViewedIngredient(mockIngredient1)
    );

    expect(newState).toEqual({
      ...previousState,
      viewedIngredient: mockIngredient1,
    });
  });

  it("должен обрабатывать setViewedIngredient и сбрасывать просматриваемый ингредиент в null", () => {
    const previousState: TSliceSelectedIngredients = {
      ...initialState,
      viewedIngredient: mockIngredient1,
    };
    const newState = reducer(previousState, setViewedIngredient(null));

    expect(newState).toEqual({
      ...previousState,
      viewedIngredient: null,
    });
  });

  it("должен обрабатывать addSelectedIngredient и добавлять ингредиент с __key", () => {
    const previousState: TSliceSelectedIngredients = { ...initialState };
    const newState = reducer(
      previousState,
      addSelectedIngredient(mockIngredient1)
    );

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [{ ...mockIngredient1, __key: "mocked-uuid" }],
    });
  });

  it("должен обрабатывать removeSelectedIngredient и удалять ингредиент по __key", () => {
    const previousState: TSliceSelectedIngredients = {
      ...initialState,
      selectedIngredients: [
        { ...mockIngredient1, __key: "uuid1" },
        { ...mockIngredient2, __key: "uuid2" },
      ],
    };
    const newState = reducer(previousState, removeSelectedIngredient("uuid1"));

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [{ ...mockIngredient2, __key: "uuid2" }],
    });
  });

  it("должен обрабатывать sortSelectedIngredients и сортировать ингредиенты", () => {
    const previousState: TSliceSelectedIngredients = {
      ...initialState,
      selectedIngredients: [
        { ...mockIngredient1, __key: "uuid1" },
        { ...mockIngredient2, __key: "uuid2" },
      ],
    };
    const sortAction: TSelectedIngredientSortAction = {
      fromIndex: 0,
      toIndex: 1,
    };
    const newState = reducer(
      previousState,
      sortSelectedIngredients(sortAction)
    );

    expect(newState).toEqual({
      ...previousState,
      selectedIngredients: [
        { ...mockIngredient2, __key: "uuid2" },
        { ...mockIngredient1, __key: "uuid1" },
      ],
    });
  });
});
