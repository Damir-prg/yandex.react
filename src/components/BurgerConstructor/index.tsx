import { FC } from "react";
import { useSelector } from "react-redux";
import { ConstructorTotal, Bun, Ingredients } from "./ui";

import type { RootState } from "services/store/store";

import classes from "./burgerConstructor.module.css";

export const BurgerConstructor: FC = () => {
  const { selectedBun, selectedIngredients } = useSelector(
    (state: RootState) => state.selectedIngredients
  );

  return (
    <section className={classes["burger-constructor"]}>
      <article className={classes["burger-constructor-items"]}>
        <Bun bun={selectedBun} orientation="top" />
        <Ingredients selectedIngredients={selectedIngredients} />
        <Bun bun={selectedBun} orientation="bottom" />
      </article>
      <ConstructorTotal />
    </section>
  );
};
