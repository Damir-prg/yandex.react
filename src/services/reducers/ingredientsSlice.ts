import type { PayloadAction } from "@reduxjs/toolkit";
import type { TIngredientResponse, TIngredient } from "api/types/ingredients";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "api/index";

type TSliceIngredients = {
  ingredients: Array<TIngredient>;
  ingredientsHash: Record<string, TIngredient>;
  loading: boolean;
  error: string | null;
};

const initialState: TSliceIngredients = {
  error: null,
  ingredients: [],
  ingredientsHash: {},
  loading: false,
};

export const loadIngredients = createAsyncThunk(
  "ingredients/get",
  api.getIngredients
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadIngredients.fulfilled,
        (state, action: PayloadAction<TIngredientResponse>) => {
          state.loading = false;

          if (action.payload.success) {
            state.ingredients = action.payload.data;

            state.ingredientsHash = action.payload.data.reduce((prev, curr) => {
              prev[curr._id] = curr;

              return prev;
            }, {} as Record<string, TIngredient>);
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
