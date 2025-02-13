import { FC } from "react";

import classes from "./ordersNumberList.module.css";
import classNames from "classnames";

type TOrdersNumberList = {
  title: string;
  isDone?: boolean;
  numbers?: number[];
};

export const OrdersNumberList: FC<TOrdersNumberList> = ({
  title,
  numbers,
  isDone = false,
}) => {
  return (
    <div className={classes["orders-number"]}>
      <h4 className={"text text_type_main-medium"}>{title}</h4>
      <ul className={classes["orders-number-list"]}>
        {numbers &&
          numbers.map((number) => (
            <li
              key={number}
              className={classNames(
                "text text_type_digits-default",
                isDone && classes["orders-number-list-item"]
              )}>
              {number}
            </li>
          ))}
      </ul>
    </div>
  );
};
