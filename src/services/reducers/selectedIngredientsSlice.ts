import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TIngredient } from "api/types";
import type { TSelectedIngredient } from "types/selectedIngredients";

type TSliceSelectedIngredients = {
  selectedIngredients: Array<TSelectedIngredient>;
  selectedBun: TIngredient | null;
  viewedIngredient: TIngredient | null;
};

type TSelectedIngredientSortAction = {
  fromIndex: number;
  toIndex: number;
};

const initialState: TSliceSelectedIngredients = {
  selectedBun: null,
  selectedIngredients: [],
  viewedIngredient: null,
};

const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    setSelectedIngredients: {
      reducer: (
        state: TSliceSelectedIngredients,
        action: PayloadAction<Array<TSelectedIngredient>>
      ) => {
        state.selectedIngredients = action.payload;
      },
      prepare: (items: Array<TIngredient>) => {
        return {
          payload: items.map((ingredient) => ({
            ...ingredient,
            __key: uuidv4(),
          })),
        };
      },
    },
    setSelectedBun(
      state: TSliceSelectedIngredients,
      action: PayloadAction<TIngredient | null>
    ) {
      state.selectedBun = action.payload;
    },
    setViewedIngredient(
      state: TSliceSelectedIngredients,
      action: PayloadAction<TIngredient | null>
    ) {
      state.viewedIngredient = action.payload;
    },
    addSelectedIngredient: {
      reducer: (
        state: TSliceSelectedIngredients,
        action: PayloadAction<TSelectedIngredient>
      ) => {
        state.selectedIngredients.push(action.payload);
      },
      prepare: (item: TIngredient) => {
        return { payload: { ...item, __key: uuidv4() } };
      },
    },
    removeSelectedIngredient(
      state: TSliceSelectedIngredients,
      action: PayloadAction<string>
    ) {
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.__key !== action.payload
      );
    },
    sortSelectedIngredients(
      state: TSliceSelectedIngredients,
      action: PayloadAction<TSelectedIngredientSortAction>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const [ingredient] = state.selectedIngredients.splice(fromIndex, 1);
      state.selectedIngredients.splice(toIndex, 0, ingredient);
    },
  },
});

export const {
  addSelectedIngredient,
  removeSelectedIngredient,
  setSelectedBun,
  setSelectedIngredients,
  sortSelectedIngredients,
  setViewedIngredient,
} = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
