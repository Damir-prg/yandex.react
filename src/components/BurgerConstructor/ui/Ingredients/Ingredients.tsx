import { useEffect } from "react";
import { setOrderItems } from "services/reducers/orderSlice";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { Ingredient } from "../Ingredient/Ingredient";

import type { FC } from "react";

import classNames from "classnames";
import classes from "./ingredients.module.css";

export const Ingredients: FC = () => {
  const dispatch = useAppDispatch();
  const { selectedIngredients, selectedBun } = useAppSelector(
    (state) => state.selectedIngredients
  );

  useEffect(() => {
    const ingredientsIds = selectedIngredients?.map((item) => item._id) || [];
    const bunId = selectedBun ? selectedBun._id : null;

    if (selectedIngredients || selectedBun) {
      const result = bunId ? [bunId, ...ingredientsIds, bunId] : ingredientsIds;
      dispatch(setOrderItems(result));
    }
  }, [selectedIngredients, selectedBun, dispatch]);

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
      {selectedIngredients.map((item, index) => (
        <Ingredient
          selectedIngredient={item}
          key={item.__key}
          currentIndex={index}
        />
      ))}
    </ul>
  );
};
