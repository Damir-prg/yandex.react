import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { removeSelectedIngredient } from "services/reducers/selectedIngredientsSlice";

import type { FC } from "react";
import type { AppDispatch } from "services/store/store";
import type { TSelectedIngredient } from "types/selectedIngredients";

import classes from "./Ingredient.module.css";

type TIngredientsProps = {
  selectedIngredient: TSelectedIngredient;
};

export const Ingredient: FC<TIngredientsProps> = ({ selectedIngredient }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClose = useCallback(
    ({ __key }: TSelectedIngredient) => {
      dispatch(removeSelectedIngredient(__key));
    },
    [dispatch]
  );

  return (
    <li className={classes["selected-ingredient"]}>
      <DragIcon type="primary" />
      <ConstructorElement
        price={selectedIngredient.price}
        text={selectedIngredient.name}
        thumbnail={selectedIngredient.image}
        handleClose={() => handleClose(selectedIngredient)}
      />
    </li>
  );
};
