import { useCallback, useMemo, useState } from "react";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setViewedIngredient } from "services/reducers/selectedIngredientsSlice";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { IngredientDetails } from "components/IngredientsDetails";
import { Modal } from "components/Modal";

import type { FC } from "react";
import type { TIngredient } from "api/types";

import classNames from "classnames";
import classes from "./ingredientCard.module.css";

type TIngredientsProps = {
  ingredient: TIngredient;
};

export const IngredientCard: FC<TIngredientsProps> = ({ ingredient }) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { selectedBun, selectedIngredients } = useAppSelector(
    (state) => state.selectedIngredients
  );
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleModalOpen = useCallback(
    (item: TIngredient) => {
      dispatch(setViewedIngredient(item));
      setModalState(true);
    },
    [dispatch]
  );

  const handleModalClose = useCallback(() => {
    dispatch(setViewedIngredient(null));
    setModalState(false);
  }, [dispatch]);

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
      <div
        ref={drag}
        className={classNames(
          classes["card-wrapper"],
          isDragging && classes["card-wrapper_drag"]
        )}
        onClick={() => handleModalOpen(ingredient)}>
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
        onClose={handleModalClose}
        title="Детали ингредиента">
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
};
