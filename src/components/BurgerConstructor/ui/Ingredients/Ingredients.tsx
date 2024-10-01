import { FC, useCallback } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useSelectedIngredients,
  TSelectedIngredientsWithKey,
} from "contexts/SelectedIngredients";

import classNames from "classnames";
import classes from "./ingredients.module.css";

type TIngredientsProps = {
  selectedIngredients: Array<TSelectedIngredientsWithKey> | null;
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
    (item: TSelectedIngredientsWithKey) =>
      setSelectedIngredients?.((prev) => {
        if (!prev || prev?.length === 1) {
          return null;
        }

        return prev.filter((prevItem) => prevItem.__key !== item.__key);
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
