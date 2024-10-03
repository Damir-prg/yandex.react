import { ComponentProps, FC, MouseEventHandler, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import type { TIngredient } from "api/types";
import { IngredientDetails } from "components/IngredientsDetails";

import classNames from "classnames";
import classes from "./bun.module.css";
import { Modal } from "components/Modal";

type TBunProps = {
  bun: TIngredient | null;
  orientation: Required<ComponentProps<typeof ConstructorElement>["type"]>;
};

export const Bun: FC<TBunProps> = ({ bun, orientation }) => {
  const [modalState, setModalState] = useState(false);
  const { setSelectedBun } = useSelectedIngredients();

  if (!bun) {
    return (
      <div
        className={classNames(
          "text text_type_main-default",
          classes["empty-bun"],
          classes[`empty-bun_${orientation}`],
          classes["bun-rewrite"]
        )}>
        Булка не выбрана
      </div>
    );
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
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
        <IngredientDetails ingredient={bun} />
      </Modal>
      <div className={classes["bun-rewrite"]} onClick={handleClick}>
        <ConstructorElement
          type={orientation}
          price={bun.price}
          text={bun.name}
          thumbnail={bun.image}
          isLocked
          handleClose={() => setSelectedBun?.(null)}
        />
      </div>
    </>
  );
};
