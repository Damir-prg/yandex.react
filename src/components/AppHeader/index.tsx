import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { HeaderButton } from "./ui/HeaderButton/HeaderButton";
import { ERoutes } from "utils/routes";

import classes from "./appHeader.module.css";
import classNames from "classnames";

enum EHeaderButton {
  CONSTRUCTOR = "Конструктор",
  FEED = "Лента заказов",
  PROFILE = "Личный кабинет",
}

const paths = {
  [ERoutes.BASE]: EHeaderButton.CONSTRUCTOR,
  [ERoutes.BASE + ERoutes.FEED]: EHeaderButton.FEED,
  [ERoutes.BASE + ERoutes.PROFILE]: EHeaderButton.PROFILE,
};

export const AppHeader = () => {
  const location = useLocation();

  const activeButton = useMemo(() => {
    const { pathname } = location;
    if (pathname === ERoutes.BASE) {
      return paths[ERoutes.BASE];
    }

    // Нет маршрута и страницы
    if (pathname === ERoutes.BASE + ERoutes.FEED) {
      return paths[ERoutes.BASE + ERoutes.FEED];
    }

    if (
      pathname.startsWith(ERoutes.BASE + ERoutes.PROFILE) &&
      pathname.split("/").length <= 3
    ) {
      return paths[ERoutes.BASE + ERoutes.PROFILE];
    }
  }, [location]);

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
              route={ERoutes.BASE}
            />
          </li>
          <li>
            <HeaderButton
              isActive={EHeaderButton.FEED === activeButton}
              Icon={ListIcon}
              title={EHeaderButton.FEED}
              route={ERoutes.BASE + ERoutes.FEED}
            />
          </li>
        </div>
        <li className={classes["header-ul-item"]}>
          <Link to={ERoutes.BASE}>
            <Logo />
          </Link>
        </li>
        <li
          className={classNames(
            classes["header-ul-item"],
            classes["header-ul-item_right"]
          )}>
          <HeaderButton
            route={ERoutes.BASE + ERoutes.PROFILE}
            isActive={EHeaderButton.PROFILE === activeButton}
            Icon={ProfileIcon}
            title={EHeaderButton.PROFILE}
          />
        </li>
      </ul>
    </header>
  );
};
