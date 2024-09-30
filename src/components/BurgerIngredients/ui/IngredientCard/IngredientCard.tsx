import { TIngredient } from "api/types";
import { FC, useCallback } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./ingredientCard.module.css";
import classNames from "classnames";
import { useSelectedIngredients } from "contexts/SelectedIngredients";

type TIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientCard: FC<TIngredientsProps> = ({ ingredient }) => {
  const { setSelectedBun, setSelectedIngredients } = useSelectedIngredients();

  const handleClick = useCallback(
    (item: TIngredient) => {
      if (!setSelectedBun || !setSelectedIngredients) {
        return;
      }

      if (item.type === "bun") {
        return setSelectedBun(item);
      }

      return setSelectedIngredients((prev) => {
        if (!prev) {
          return [item];
        }

        return prev.find((prevItem) => prevItem._id === item._id)
          ? prev
          : [...prev, item];
      });
    },
    [setSelectedBun, setSelectedIngredients]
  );

  const { image, name, price } = ingredient;

  return (
    <div
      className={classes["card-wrapper"]}
      onClick={() => handleClick(ingredient)}>
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
