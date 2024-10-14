import { FC } from "react";
import { TSelectedIngredientsWithKey } from "contexts/SelectedIngredients";
import { Ingredient } from "../Ingredient/Ingredient";

import classNames from "classnames";
import classes from "./ingredients.module.css";

type TIngredientsProps = {
  selectedIngredients: Array<TSelectedIngredientsWithKey> | null;
};

export const Ingredients: FC<TIngredientsProps> = ({ selectedIngredients }) => {
  if (!selectedIngredients) {
    return (
      <div
        className={classNames(
          "text text_type_main-default",
          classes["empty-ingredients"],
          classes["empty-ingredients-margin"]
        )}>
        Начинка или соус не выбраны
      </div>
    );
  }

  return (
    <ul className={classes["selected-ingredients-wrapper"]}>
      {selectedIngredients.map((item) => (
        <Ingredient selectedIngredient={item} key={item.__key} />
      ))}
    </ul>
  );
};
