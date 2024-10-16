import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

import type { FC } from "react";

import classNames from "classnames";
import classes from "./headerButton.module.css";

type THeaderButtonProps = {
  Icon: FC<TIconProps>;
  title: string;
  isActive?: boolean;
};

export const HeaderButton: FC<THeaderButtonProps> = ({
  Icon,
  title,
  isActive,
}) => {
  const titleClassName = classNames(`text text_type_main-default`, {
    text_color_inactive: !isActive,
  });

  return (
    <a
      href="#"
      className={classNames(
        classes["header-button"],
        !isActive && classes["header-button_disabled"]
      )}>
      <Icon type={isActive ? "primary" : "secondary"} />
      <p className={titleClassName}>{title}</p>
    </a>
  );
};
