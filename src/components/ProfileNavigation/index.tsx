import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "services/hooks";
import { logoutUser } from "services/reducers/userSlice";
import { ERoutes } from "utils/routes";
import { getCookie } from "utils/cookie";

import type { FC } from "react";

import classes from "./profileNavigation.module.css";
import classNames from "classnames";

const routes = {
  profile: ERoutes.BASE + ERoutes.PROFILE,
  orders:
    ERoutes.BASE + ERoutes.PROFILE + ERoutes.BASE + ERoutes.PROFILE_ORDERS,
};
const descriptions = {
  [routes.profile]:
    "В этом разделе вы можете изменить свои персональные данные",
  [routes.orders]: "В этом разделе вы можете просмотреть свою историю заказов",
};

export const ProfileNavigation: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const activeTab = useMemo(() => {
    const { pathname } = location;
    if (pathname.startsWith(routes.orders)) {
      return routes.orders;
    }

    if (pathname.startsWith(routes.profile)) {
      return routes.profile;
    }

    return "";
  }, [location]);

  const logoutEvent = async () => {
    const token = getCookie("refreshToken");
    await dispatch(logoutUser({ token }));
    navigate(ERoutes.BASE);
  };

  return (
    <nav className={classes["profile-navigation"]}>
      <ul className={classes["profile-navigation__list"]}>
        <li
          className={classNames(
            classes["profile-navigation__list-item"],
            classes["profile-navigation__list-item-1"]
          )}>
          <Link
            to={routes.profile}
            className={classNames(
              "text text_type_main-medium",
              classes["profile-navigation__link"],
              activeTab !== routes.profile && "text_color_inactive"
            )}>
            Профиль
          </Link>
        </li>
        <li
          className={classNames(
            classes["profile-navigation__list-item"],
            classes["profile-navigation__list-item-2"]
          )}>
          <Link
            to={ERoutes.PROFILE_ORDERS}
            className={classNames(
              "text text_type_main-medium",
              classes["profile-navigation__link"],
              activeTab !== routes.orders && "text_color_inactive"
            )}>
            История заказов
          </Link>
        </li>
        <li
          className={classNames(
            classes["profile-navigation__list-item"],
            classes["profile-navigation__list-item-3"]
          )}>
          <span
            className={classNames(
              "text text_type_main-medium text_color_inactive",
              classes["profile-navigation__link"]
            )}
            onClick={() => logoutEvent()}>
            Выход
          </span>
        </li>
      </ul>
      <p
        key={descriptions[activeTab]}
        className={classNames(
          "text text_type_main-small text_color_inactive",
          classes["profile-navigation__description"]
        )}>
        {descriptions[activeTab]}
      </p>
    </nav>
  );
};
