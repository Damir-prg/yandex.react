import { FC, useCallback, useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import { TIngredient } from "api/types";
import { v4 as uuidv4 } from "uuid";

import classNames from "classnames";
import classes from "./ingredientCard.module.css";

type TIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientCard: FC<TIngredientsProps> = ({ ingredient }) => {
  const {
    setSelectedBun,
    setSelectedIngredients,
    selectedBun,
    selectedIngredients,
  } = useSelectedIngredients();

  const handleClick = useCallback(
    (item: TIngredient) => {
      if (!setSelectedBun || !setSelectedIngredients) {
        return;
      }

      if (item.type === "bun") {
        return setSelectedBun(item);
      }

      return setSelectedIngredients((prev) => {
        const itemWithKey = { ...item, __key: uuidv4() };

        if (!prev) {
          return [itemWithKey];
        }

        return prev.find((prevItem) => prevItem.__key === itemWithKey.__key)
          ? prev
          : [...prev, itemWithKey];
      });
    },
    [setSelectedBun, setSelectedIngredients]
  );

  const count = useMemo(() => {
    if (selectedBun && selectedBun._id === ingredient._id) {
      return 1;
    }

    if (selectedIngredients) {
      return selectedIngredients.filter((item) => item._id === ingredient._id)
        .length;
    }

    return 0;
  }, [selectedBun, selectedIngredients, ingredient]);

  return (
    <div
      className={classes["card-wrapper"]}
      onClick={() => handleClick(ingredient)}>
      {count ? <Counter count={count} size="default" /> : null}
      <img
        src={ingredient.image}
        alt={`${ingredient.name} изображение`}
        className={classes["card-img"]}
      />
      <span
        className={classNames(
          "text text_type_main-default",
          classes["card-price"]
        )}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </span>
      <p
        className={classNames(
          "text text_type_main-default",
          classes["card-title"]
        )}>
        {ingredient.name}
      </p>
    </div>
  );
};
