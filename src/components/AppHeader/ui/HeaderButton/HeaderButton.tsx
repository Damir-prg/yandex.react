import { FC, MouseEventHandler } from "react";
import classNames from "classnames";

import classes from "./headerButton.module.css";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

type THeaderButtonProps = {
  Icon: FC<TIconProps>;
  title: string;
  callback?: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

export const HeaderButton: FC<THeaderButtonProps> = ({
  Icon,
  title,
  callback,
  isActive,
  disabled,
}) => {
  // Установка стилей для компонента
  const titleClassName = classNames(`text text_type_main-default`, {
    text_color_inactive: !isActive,
  });

  // Инициализация функции обработчика события нажатия на кнопку
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    callback?.();
  };

  return (
    <button
      disabled={disabled}
      className={classes["header-button"]}
      onClick={handleClick}>
      <Icon type={isActive ? "primary" : "secondary"} />
      <p className={titleClassName}>{title}</p>
    </button>
  );
};
