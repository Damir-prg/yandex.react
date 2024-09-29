import { FC, FormEventHandler } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import classes from "./constructorTotal.module.css";
import classNames from "classnames";

type TConstructorTotalProps = {
  count?: number;
};

export const ConstructorTotal: FC<TConstructorTotalProps> = ({ count }) => {
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
        {count}
        <CurrencyIcon type="primary" />
      </span>
      <Button htmlType="submit">Оформить заказ</Button>
    </form>
  );
};
