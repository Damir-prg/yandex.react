import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "components/Modal";
import { OrderDetails } from "components/OrderDetails";
import { postOrder } from "services/reducers/orderSlice";

import type { FC, FormEventHandler } from "react";
import type { AppDispatch, RootState } from "services/store/store";

import classNames from "classnames";
import classes from "./constructorTotal.module.css";

export const ConstructorTotal: FC = () => {
  const [modalState, setModalState] = useState(false);
  const { selectedBun, selectedIngredients } = useSelector(
    (state: RootState) => state.selectedIngredients
  );
  const { loading, name, error, order, orderItems } = useSelector(
    (state: RootState) => state.order
  );
  const dispatch: AppDispatch = useDispatch();

  const createOrder = useCallback(async (orderItems: Array<string>) => {
    try {
      await dispatch(postOrder({ ingredients: orderItems }));

      setModalState(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    createOrder(orderItems);
  };

  return (
    <>
      <Modal
        title={name || ""}
        isOpen={modalState}
        onClose={() => setModalState(false)}>
        {!error && order ? <OrderDetails orderNumber={order.number} /> : error}
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
        <Button htmlType="submit">
          {loading ? "Оформление заказа..." : "Оформить заказ"}
        </Button>
      </form>
    </>
  );
};
