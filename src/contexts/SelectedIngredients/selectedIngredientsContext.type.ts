import { TIngredient } from "api/types";
import { Dispatch, SetStateAction } from "react";

export type TSelectedIngredientsContext = {
  selectedBun: TIngredient | null;
  selectedIngredients: Array<TIngredient> | null;
  setSelectedIngredients: Dispatch<
    SetStateAction<Array<TIngredient> | null>
  > | null;
  setSelectedBun: Dispatch<SetStateAction<TIngredient | null>> | null;
};
