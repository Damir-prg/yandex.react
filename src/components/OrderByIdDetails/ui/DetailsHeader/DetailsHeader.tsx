import { TFeedOrderItem } from "api/types/feed";
import { FC } from "react";

import classes from "./detailsHeader.module.css";
import classNames from "classnames";

export const DetailsHeader: FC<Pick<TFeedOrderItem, "number">> = ({
  number,
}) => {
  return (
    <h2
      className={classNames(
        classes["order-by-id-details-header"],
        "text text_type_digits-default"
      )}>
      #{number}
    </h2>
  );
};
