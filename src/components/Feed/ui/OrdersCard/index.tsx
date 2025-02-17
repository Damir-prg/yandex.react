import { FC } from "react";
import { TFeedOrderItem } from "api/types/feed";

import classes from "./ordersCard.module.css";

import { OrdersCardHeader } from "./OrdersCardHeader";
import { OrdersCardTitle } from "./OrdersCardTitle";
import { OrdersCardComponents } from "./OrdersCardComponents";
import { Link, useLocation } from "react-router-dom";

export const OrdersCard: FC<TFeedOrderItem> = (props) => {
  const location = useLocation();

  return (
    <li className={classes["orders-card"]}>
      <Link
        to={props._id}
        state={{ background: location }}
        className={classes["orders-card-link"]}>
        <OrdersCardHeader number={props.number} createdAt={props.createdAt} />
        <OrdersCardTitle name={props.name} />
        <OrdersCardComponents ingredients={props.ingredients} />
      </Link>
    </li>
  );
};
