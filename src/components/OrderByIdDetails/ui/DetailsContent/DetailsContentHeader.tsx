import { TFeedOrderItem } from "api/types/feed";
import { FC, useMemo } from "react";

import classes from "./detailsContent.module.css";
import classNames from "classnames";

export const DetailsContentHeader: FC<
  Pick<TFeedOrderItem, "name" | "status">
> = ({ name, status }) => {
  const localStatus = useMemo(() => {
    switch (status) {
      case "created":
        return "Создан";
      case "pending":
        return "В работе";
      case "done":
        return "Выполнен";
      default:
        return "Статус заказа неизвестен";
    }
  }, [status]);

  return (
    <div className={classes["order-by-id-details-content-header-wrapper"]}>
      <h3 className={classNames("text text_type_main-medium")}>{name}</h3>
      <span
        className={classNames(
          status === "done" &&
            classes["order-by-id-details-content-status-done"],
          "text text_type_main-default"
        )}>
        {localStatus}
      </span>
    </div>
  );
};
