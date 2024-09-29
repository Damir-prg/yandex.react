import { FC } from "react";
import { TIngredient } from "api/types";

import classes from "./constructorItems.module.css";

type TConstructorItemsProps = {
  ingredients?: TIngredient;
};

export const ConstructorItems: FC<TConstructorItemsProps> = ({}) => {
  return (
    <article className={classes["constructor-items"]}>ConstructorItems</article>
  );
};
