import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  TSelectedIngredientsWithKey,
  useSelectedIngredients,
} from "contexts/SelectedIngredients";
import { FC, MouseEventHandler, useCallback, useState } from "react";

import classes from "./Ingredient.module.css";
import { Modal } from "components/Modal";
import { IngredientDetails } from "components/IngredientsDetails";

type TIngredientsProps = {
  selectedIngredient: TSelectedIngredientsWithKey;
};

export const Ingredient: FC<TIngredientsProps> = ({ selectedIngredient }) => {
  const [modalState, setModalState] = useState(false);
  const { setSelectedIngredients } = useSelectedIngredients();

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

  const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setModalState(true);
  };

  return (
    <>
      <Modal
        isOpen={modalState}
        onClose={() => setModalState(false)}
        title="Детали ингредиента">
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      <li className={classes["selected-ingredient"]} onClick={handleClick}>
        <DragIcon type="primary" />
        <ConstructorElement
          price={selectedIngredient.price}
          text={selectedIngredient.name}
          thumbnail={selectedIngredient.image}
          handleClose={() => handleClose(selectedIngredient)}
        />
      </li>
    </>
  );
};
