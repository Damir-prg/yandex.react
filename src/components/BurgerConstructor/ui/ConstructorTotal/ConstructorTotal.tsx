import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "components/Modal";
import { OrderDetails } from "components/OrderDetails";
import { postOrder } from "services/reducers/orderSlice";
import { useAppSelector, useAppDispatch } from "services/hooks";
import {
  setSelectedBun,
  setSelectedIngredients,
} from "services/reducers/selectedIngredientsSlice";
import { ERoutes } from "utils/routes";

import type { FC, FormEventHandler } from "react";

import classNames from "classnames";
import classes from "./constructorTotal.module.css";

export const ConstructorTotal: FC = () => {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();
  const { selectedBun, selectedIngredients } = useAppSelector(
    (state) => state.selectedIngredients
  );
  const { loading, name, error, order, orderItems } = useAppSelector(
    (state) => state.order
  );
  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const createOrder = useCallback(async (orderItems: Array<string>) => {
    try {
      await dispatch(postOrder({ ingredients: orderItems }));

      setModalState(true);

      dispatch(setSelectedBun(null));
      dispatch(setSelectedIngredients([]));
    } catch (error) {
      console.error(error);
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
    if (!isAuth) {
      navigate(ERoutes.BASE + ERoutes.LOGIN);
      return;
    }
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
        <Button htmlType="submit" disabled={orderItems.length === 0}>
          {loading ? "Оформление заказа..." : "Оформить заказ"}
        </Button>
      </form>
    </>
  );
};
