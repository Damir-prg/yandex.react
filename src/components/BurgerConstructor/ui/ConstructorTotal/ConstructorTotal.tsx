import { FC, FormEventHandler, useMemo } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./constructorTotal.module.css";
import classNames from "classnames";
import { useSelectedIngredients } from "contexts/SelectedIngredients";

export const ConstructorTotal: FC = () => {
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
  };

  return (
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
  );
};
