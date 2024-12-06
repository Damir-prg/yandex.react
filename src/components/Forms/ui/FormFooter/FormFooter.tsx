import { Link } from "react-router-dom";

import classes from "./formFooter.module.css";
import classNames from "classnames";
import { FC } from "react";

type TFormFooter = {
  text?: string;
} & ( // В случае, если будет добавлен один из параметров, второй будет обязателен
  | { linkText?: undefined; to?: undefined }
  | { linkText: string; to: string }
);

export const FormFooter: FC<{ data: Array<TFormFooter> }> = ({ data }) => {
  return (
    <div className={classes["login-footer"]}>
      {data.map((item, index) => {
        return (
          <p className={classNames(classes["form-text-center"])} key={index}>
            {item?.text && (
              <span
                className={classNames(
                  "text text_type_main-default",
                  "text_color_inactive"
                )}>
                {item?.text}
              </span>
            )}{" "}
            {item?.linkText && (
              <Link
                to={item.to}
                className={classNames(
                  "text text_type_main-default",
                  classes["form-footer-link"]
                )}>
                {item.linkText}
              </Link>
            )}
          </p>
        );
      })}
    </div>
  );
};
