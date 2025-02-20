import { describe, it, expect } from "@jest/globals";
import reducer, {
  setIngredient,
  setOpenState,
  initialState,
} from "./ingredientsModalSlice";
import type { TSliceIngredientsModal } from "./ingredientsModalSlice";
import type { TIngredient } from "api/types/ingredients";

import ingredients from "../testMocks/ingredients.json";

const typedIngredients = ingredients as { data: TIngredient[] };

const mockIngredient = typedIngredients.data[0];

describe("ingredientsModalSlice", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен обрабатывать setIngredient и устанавливать ингредиент", () => {
    const previousState: TSliceIngredientsModal = { ...initialState };
    const newState = reducer(previousState, setIngredient(mockIngredient));

    expect(newState).toEqual({
      ...previousState,
      ingredient: mockIngredient,
    });
  });

  it("должен обрабатывать setIngredient и сбрасывать ингредиент в null", () => {
    const previousState: TSliceIngredientsModal = {
      ...initialState,
      ingredient: mockIngredient,
    };
    const newState = reducer(previousState, setIngredient(null));

    expect(newState).toEqual({
      ...previousState,
      ingredient: null,
    });
  });

  it("должен обрабатывать setOpenState и устанавливать isOpen в true", () => {
    const previousState: TSliceIngredientsModal = { ...initialState };
    const newState = reducer(previousState, setOpenState(true));

    expect(newState).toEqual({
      ...previousState,
      isOpen: true,
    });
  });

  it("должен обрабатывать setOpenState и устанавливать isOpen в false", () => {
    const previousState: TSliceIngredientsModal = {
      ...initialState,
      isOpen: true,
    };
    const newState = reducer(previousState, setOpenState(false));

    expect(newState).toEqual({
      ...previousState,
      isOpen: false,
    });
  });
});
