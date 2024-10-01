import { FC } from "react";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import { ConstructorTotal, Bun, Ingredients } from "./ui";

import classes from "./burgerConstructor.module.css";

export const BurgerCostructor: FC = () => {
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

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
