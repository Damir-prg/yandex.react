import { FC } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "components/ModalOverlay";
import { ModalWrapper, ModalHeader } from "./ui";

import type { TModalProps } from "types/modal";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  if (!modalRoot || !isOpen) {
    return;
  }

  return ReactDOM.createPortal(
    <>
      <ModalWrapper>
        <ModalHeader onClose={onClose} title={title} />
        {children}
      </ModalWrapper>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};
