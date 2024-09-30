import { useContext } from "react";
import { Ingredients } from "./IngredientsContext";

export const useIngredients = () => {
  const ingredients = useContext(Ingredients);
  return ingredients;
};
