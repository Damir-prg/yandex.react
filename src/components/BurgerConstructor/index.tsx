import { FC, useCallback } from "react";
import { useDrop } from "react-dnd";
import {
  setSelectedBun,
  addSelectedIngredient,
} from "services/reducers/selectedIngredientsSlice";
import { useAppDispatch } from "services/hooks";
import { ConstructorTotal, Bun, Ingredients } from "./ui";

import type { TIngredient } from "api/types";

import classes from "./burgerConstructor.module.css";

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();

  const onDrop = useCallback((item: { ingredient: TIngredient }) => {
    const { ingredient } = item;

    if (ingredient.type === "bun") {
      dispatch(setSelectedBun(ingredient));
      return;
    }

    dispatch(addSelectedIngredient(ingredient));
  }, []);

  const [_, drop] = useDrop(() => ({
    accept: "ingredient",
    drop: (item: { ingredient: TIngredient }, monitor) => {
      if (monitor.didDrop()) return;
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <section className={classes["burger-constructor"]}>
      <article ref={drop} className={classes["burger-constructor-items"]}>
        <Bun orientation="top" />
        <Ingredients />
        <Bun orientation="bottom" />
      </article>
      <ConstructorTotal />
    </section>
  );
};
