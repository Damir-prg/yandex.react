import { TFeedOrderItem } from "api/types/feed";
import { FC } from "react";

export const OrdersCardTitle: FC<Pick<TFeedOrderItem, "name">> = ({ name }) => {
  return <span className="text text_type_main-medium">{name}</span>;
};
