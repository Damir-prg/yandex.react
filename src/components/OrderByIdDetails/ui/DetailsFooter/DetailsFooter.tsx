import { TFeedOrderItem } from "api/types/feed";
import { FC } from "react";

import classes from "./detailsFooter.module.css";
import { DateUtils } from "utils/dateUtils";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

export const DetailsFooter: FC<
  Pick<TFeedOrderItem, "createdAt"> & { totalPrice: number }
> = ({ createdAt, totalPrice }) => {
  return (
    <div className={classNames(classes["order-by-id-details-footer"])}>
      <span
        className="
        text text_type_main-default text_color_inactive">
        {DateUtils.getRuLocaleDate(createdAt)}
      </span>
      <span
        className={classNames(
          classes["order-by-id-details-footer-price"],
          "text text_type_digits-default"
        )}>
        {totalPrice} <CurrencyIcon type="primary" />
      </span>
    </div>
  );
};
