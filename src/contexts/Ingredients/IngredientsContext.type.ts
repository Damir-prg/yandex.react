import { Dispatch, SetStateAction } from "react";
import { TIngredient } from "api/types";

export type TIngredientContext = {
  isLoading: boolean;
  ingredients?: Array<TIngredient>;
  setIngredients?: Dispatch<SetStateAction<TIngredient[]>>;
};
