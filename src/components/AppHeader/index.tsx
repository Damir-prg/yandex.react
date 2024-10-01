import { useState } from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { HeaderButton } from "./ui/HeaderButton/HeaderButton";

import classes from "./appHeader.module.css";
import classNames from "classnames";

enum EHeaderButton {
  CONSTRUCTOR = "Конструктор",
  ORDERS = "Лента заказов",
  PROFILE = "Личный кабинет",
}

export const AppHeader = () => {
  const [activeButton, setActiveButton] = useState<EHeaderButton>(
    EHeaderButton.CONSTRUCTOR
  );

  return (
    <header className={classes["header"]}>
      <ul className={classes["header-ul"]}>
        <div
          className={classNames(
            classes["header-ul-item"],
            classes["header-ul-item_left"]
          )}>
          <li>
            <HeaderButton
              isActive={EHeaderButton.CONSTRUCTOR === activeButton}
              Icon={BurgerIcon}
              title={EHeaderButton.CONSTRUCTOR}
              callback={() => setActiveButton(EHeaderButton.CONSTRUCTOR)}
            />
          </li>
          <li>
            <HeaderButton
              isActive={EHeaderButton.ORDERS === activeButton}
              Icon={ListIcon}
              title={EHeaderButton.ORDERS}
              callback={() => setActiveButton(EHeaderButton.ORDERS)}
              disabled
            />
          </li>
        </div>
        <li className={classes["header-ul-item"]}>
          <Logo />
        </li>
        <li
          className={classNames(
            classes["header-ul-item"],
            classes["header-ul-item_right"]
          )}>
          <HeaderButton
            isActive={EHeaderButton.PROFILE === activeButton}
            Icon={ProfileIcon}
            title={EHeaderButton.PROFILE}
            callback={() => setActiveButton(EHeaderButton.PROFILE)}
            disabled
          />
        </li>
      </ul>
    </header>
  );
};
