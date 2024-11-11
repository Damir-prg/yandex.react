import { PageContainer } from "pages/ui";
import { BurgerIngredients } from "components/BurgerIngredients";
import { BurgerConstructor } from "components/BurgerConstructor";
import { IngredientDetails } from "components/IngredientsDetails";
import { Modal } from "components/Modal";
import { useAppDispatch, useAppSelector } from "services/hooks";
import {
  setOpenState,
  setIngredient,
} from "services/reducers/ingredientsModalSlice";

import classes from "./homePage.module.css";

export const HomePage = () => {
  const modalState = useAppSelector((state) => state.ingredientsModal);
  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(setIngredient(null));
    dispatch(setOpenState(false));
    history.pushState(null, "", "/");
  };

  return (
    <PageContainer className={classes["home-page"]}>
      <BurgerIngredients />
      <BurgerConstructor />
      <Modal
        isOpen={modalState.isOpen}
        onClose={onModalClose}
        title="Детали ингредиента">
        <IngredientDetails ingredient={modalState.ingredient} />
      </Modal>
    </PageContainer>
  );
};
