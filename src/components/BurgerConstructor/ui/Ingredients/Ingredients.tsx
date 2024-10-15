import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderItems } from "services/reducers/orderSlice";
import { Ingredient } from "../Ingredient/Ingredient";

import type { FC } from "react";
import type { RootState } from "services/store/store";

import classNames from "classnames";
import classes from "./ingredients.module.css";

export const Ingredients: FC = () => {
  const dispatch = useDispatch();
  const { selectedIngredients, selectedBun } = useSelector(
    (state: RootState) => state.selectedIngredients
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
