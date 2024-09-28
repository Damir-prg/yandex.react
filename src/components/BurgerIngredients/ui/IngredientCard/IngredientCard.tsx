import { TIngredient } from "api/types";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./ingredientCard.module.css";
import classNames from "classnames";

type TIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientCard: FC<TIngredientsProps> = ({ ingredient }) => {
  const { image, name, price } = ingredient;

  return (
    <div className={classes["card-wrapper"]}>
      <img
        src={image}
        alt={`${name} изображение`}
        className={classes["card-img"]}
      />
      <span
        className={classNames(
          "text text_type_main-default",
          classes["card-price"]
        )}>
        {price}
        <CurrencyIcon type="primary" />
      </span>
      <p
        className={classNames(
          "text text_type_main-default",
          classes["card-title"]
        )}>
        {name}
      </p>
    </div>
  );
};
