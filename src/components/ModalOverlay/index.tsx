import { FC, MouseEventHandler, useCallback } from "react";
import { TModalProps } from "types/modal";

import classes from "./modalOverlay.module.css";

export const ModalOverlay: FC<Pick<TModalProps, "onClose">> = ({ onClose }) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      onClose();
    },
    [onClose]
  );

  return <div className={classes["modal-overlay"]} onClick={handleClick} />;
};
