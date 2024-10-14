import { useContext } from "react";
import { SelectedIngredients } from "./SelectedIngredientsContext";

export const useSelectedIngredients = () => {
  const selectedIngredients = useContext(SelectedIngredients);
  return selectedIngredients;
};
