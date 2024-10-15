import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeSelectedIngredient,
  sortSelectedIngredients,
} from "services/reducers/selectedIngredientsSlice";

import type { FC } from "react";
import type { AppDispatch } from "services/store/store";
import type { TSelectedIngredient } from "types/selectedIngredients";

import classes from "./Ingredient.module.css";
import React from "react";
import { useDrop, useDrag } from "react-dnd";

type TIngredientsProps = {
  selectedIngredient: TSelectedIngredient;
  currentIndex: number;
};

export const Ingredient: FC<TIngredientsProps> = ({
  selectedIngredient,
  currentIndex,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const ref = React.useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: "constructor-ingredient",
    hover(draggedItem: { index: number }) {
      if (draggedItem.index === currentIndex) return;
      dispatch(
        sortSelectedIngredients({
          fromIndex: draggedItem.index,
          toIndex: currentIndex,
        })
      );
      draggedItem.index = currentIndex;
    },
  });

  const [, drag] = useDrag({
    type: "constructor-ingredient",
    item: { index: currentIndex },
  });

  drag(drop(ref));

  const handleClose = useCallback(
    ({ __key }: TSelectedIngredient) => {
      dispatch(removeSelectedIngredient(__key));
    },
    [dispatch]
  );

  return (
    <li ref={ref} className={classes["selected-ingredient"]}>
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
