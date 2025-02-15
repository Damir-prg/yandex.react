import { TFeedOrderItem } from "api/types/feed";
import { FC } from "react";
import { DateUtils } from "utils/dateUtils";

import classes from "./ordersCard.module.css";

export const OrdersCardHeader: FC<
  Pick<TFeedOrderItem, "number" | "createdAt">
> = ({ number, createdAt }) => {
  return (
    <div className={classes["orders-card-header"]}>
      <span className="text text_type_digits-default">#{number}</span>
      <span className="text text_type_main-default text_color_inactive">
        {DateUtils.getRuLocaleDate(createdAt)}
      </span>
    </div>
  );
};
