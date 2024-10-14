import { FC } from "react";

import classes from "./spinner.module.css";

export const Spinner: FC<{ description?: string }> = ({ description }) => {
  return (
    <div className={classes["spinner-wrapper"]}>
      <div className={classes["spinner"]} />
      {description && (
        <p className="text text_type_main-default">{description}</p>
      )}
    </div>
  );
};
