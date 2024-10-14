import { FC, useCallback, useMemo, useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import { TIngredient } from "api/types";
import { IngredientDetails } from "components/IngredientsDetails";
import { Modal } from "components/Modal";

import classNames from "classnames";
import classes from "./ingredientCard.module.css";

type TIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientCard: FC<TIngredientsProps> = ({ ingredient }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

  const handleClick = useCallback(() => {
    setModalState(true);
  }, []);

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
    <>
      <div className={classes["card-wrapper"]} onClick={handleClick}>
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
      <Modal
        isOpen={modalState}
        onClose={() => setModalState(false)}
        title="Детали ингредиента">
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
};
