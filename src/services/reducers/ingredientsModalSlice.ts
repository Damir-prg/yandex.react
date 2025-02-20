import type { TIngredient } from "api/types/ingredients";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSliceIngredientsModal = {
  ingredient: TIngredient | null;
  isOpen: boolean;
};

export const initialState: TSliceIngredientsModal = {
  ingredient: null,
  isOpen: false,
};

const ingredientsModalSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    setIngredient(
      state,
      action: PayloadAction<TSliceIngredientsModal["ingredient"]>
    ) {
      state.ingredient = action.payload;
    },
    setOpenState(
      state,
      action: PayloadAction<TSliceIngredientsModal["isOpen"]>
    ) {
      state.isOpen = action.payload;
    },
  },
});

export const { setIngredient, setOpenState } = ingredientsModalSlice.actions;
export default ingredientsModalSlice.reducer;
