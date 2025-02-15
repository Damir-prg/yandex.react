import { IngredientDetails } from "components/IngredientsDetails";
import { Modal } from "components/Modal";
import { FC } from "react";

export const ModalWrapper: FC<{ onClose: () => void; background: any }> = ({
  onClose,
  background,
}) => {
  console.log(background);

  return (
    <Modal onClose={onClose} title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  );
};
