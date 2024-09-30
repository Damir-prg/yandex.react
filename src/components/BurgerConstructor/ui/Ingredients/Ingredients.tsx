import { TIngredient } from "api/types";
import classNames from "classnames";
import { FC, useCallback } from "react";

import classes from "./ingredients.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";

type TIngredientsProps = {
  selectedIngredients: Array<TIngredient> | null;
};

export const Ingredients: FC<TIngredientsProps> = ({ selectedIngredients }) => {
  const { setSelectedIngredients } = useSelectedIngredients();

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

  const handleClose = useCallback(
    (item: TIngredient) =>
      setSelectedIngredients?.((prev) => {
        if (!prev || prev?.length === 1) {
          return null;
        }

        return prev.filter((prevItem) => prevItem._id !== item._id);
      }),
    [setSelectedIngredients]
  );

  return (
    <ul className={classes["selected-ingredients-wrapper"]}>
      {selectedIngredients.map((item) => (
        <li key={item._id} className={classes["selected-ingredient"]}>
          <DragIcon type="primary" />
          <ConstructorElement
            price={item.price}
            text={item.name}
            thumbnail={item.image}
            handleClose={() => handleClose(item)}
          />
        </li>
      ))}
    </ul>
  );
};
