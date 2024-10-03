import { FC, MouseEventHandler, useCallback, useEffect } from "react";
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

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return <div className={classes["modal-overlay"]} onClick={handleClick} />;
};
