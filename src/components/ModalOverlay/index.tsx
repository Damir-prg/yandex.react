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
      // Code to handle the escape button click
      console.log("Escape button pressed");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  }, []);

  return <div className={classes["modal-overlay"]} onClick={handleClick} />;
};
