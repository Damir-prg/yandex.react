import { TFeedOrderItem } from "api/types/feed";
import { FC } from "react";

import classes from "./ordersCard.module.css";

import { OrdersCardHeader } from "./ordersCardHeader";
import { OrdersCardTitle } from "./OrdersCardTitle";
import { OrdersCardComponents } from "./OrdersCardComponents";

export const OrdersCard: FC<TFeedOrderItem> = (props) => {
  return (
    <li className={classes["orders-card"]}>
      <OrdersCardHeader number={props.number} createdAt={props.createdAt} />
      <OrdersCardTitle name={props.name} />
      <OrdersCardComponents ingredients={props.ingredients} />
    </li>
  );
};
