import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsApi } from "api/index";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { TIngredientResponse, TIngredient } from "api/types";

type TSliceIngredients = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

const initialState: TSliceIngredients = {
  error: null,
  ingredients: [],
  loading: false,
};

export const loadIngredients = createAsyncThunk(
  "ingredients/get",
  ingredientsApi.getAll
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        loadIngredients.fulfilled,
        (
          state: TSliceIngredients,
          action: PayloadAction<TIngredientResponse>
        ) => {
          state.loading = false;

          if (action?.payload?.data) {
            state.ingredients = action.payload.data;
          } else {
            state.ingredients = [];
          }
        }
      )
      .addCase(loadIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Ошибка при загрузке данных";
      });
  },
});

export default ingredientsSlice.reducer;
