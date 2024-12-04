import { FC, useMemo } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "components/ModalOverlay";
import { ModalWrapper, ModalHeader } from "./ui";

import type { TModalProps } from "types/modal";
import { useAppSelector } from "services/hooks";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  const modalState = useAppSelector((state) => state.ingredientsModal);

  const isModalOpen = useMemo(() => {
    return modalState.isOpen || isOpen;
  }, [isOpen, modalState]);

  if (!modalRoot || !isModalOpen) {
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
