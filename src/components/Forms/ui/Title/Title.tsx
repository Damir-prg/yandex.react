import type { FC } from "react";

import classes from "./title.module.css";
import classNames from "classnames";

export const Title: FC<{ text: string }> = ({ text }) => {
  return (
    <h3
      className={classNames(
        "text text_type_main-medium",
        classes["login-text-center"]
      )}>
      {text}
    </h3>
  );
};
