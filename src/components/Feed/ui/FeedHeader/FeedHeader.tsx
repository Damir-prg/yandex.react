import classNames from "classnames";

import classes from "./feedHeader.module.css";

export const FeedHeader = () => {
  return (
    <h1
      className={classNames(
        "text text_type_main-large",
        classes["feed-header"]
      )}>
      Лента заказов
    </h1>
  );
};
