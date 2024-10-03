import { FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import type { TModalProps } from "types/modal";

import classNames from "classnames";
import classes from "./modalHeader.module.css";

export const ModalHeader: FC<Pick<TModalProps, "onClose" | "title">> = ({
  onClose,
  title,
}) => {
  return (
    <div
      className={classNames(
        classes["modal-header"],
        title
          ? classes["modal-header_between"]
          : classes["modal-header_flex-end"]
      )}>
      {title && <span className="text text_type_main-large">{title}</span>}
      <CloseIcon
        type="primary"
        onClick={onClose}
        className={classes["hover"]}
      />
    </div>
  );
};
