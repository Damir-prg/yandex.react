import { FC, FormEventHandler, useMemo, useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import { Modal } from "components/Modal";
import { OrderDetails } from "components/OrderDetails";

import classNames from "classnames";
import classes from "./constructorTotal.module.css";

export const ConstructorTotal: FC = () => {
  const [modalState, setModalState] = useState(false);
  const { selectedBun, selectedIngredients } = useSelectedIngredients();

  const totalPrice = useMemo(() => {
    let total = 0;

    if (selectedBun) {
      total += selectedBun.price;
    }

    if (selectedIngredients) {
      total += selectedIngredients.reduce((prev, acc) => {
        return prev + acc.price;
      }, 0);
    }

    return total;
  }, [selectedBun, selectedIngredients]);

  const formSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setModalState(true);
  };

  return (
    <>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <OrderDetails />
      </Modal>
      <form onSubmit={formSubmit} className={classes["total-form"]}>
        <span
          className={classNames(
            "text text_type_main-large",
            classes["total-form-count"]
          )}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="submit">Оформить заказ</Button>
      </form>
    </>
  );
};
