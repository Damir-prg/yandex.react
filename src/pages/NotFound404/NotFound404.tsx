import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ERoutes } from "utils/routes";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./notFound404.module.css";
import classNames from "classnames";

export const NotFound404: FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ERoutes.BASE);
  };

  return (
    <PageContainer className={classes["not-found-page"]}>
      <div className={classNames(classes["star"], classes["star1"])}></div>
      <div className={classNames(classes["star"], classes["star2"])}></div>
      <div className={classNames(classes["star"], classes["star3"])}></div>
      <div className={classNames(classes["star"], classes["star4"])}></div>
      <div className={classNames(classes["star"], classes["star5"])}></div>
      <div className={classNames(classes["star"], classes["star6"])}></div>

      <div className={classNames(classes["not-found-error"])}>
        <div className="text text_type_digits-large">404</div>
        <div>
          <div className="text text_type_main-medium">Хммм...</div>
          <div className="text text_type_main-default text_color_inactive">
            {"Страницу не удалось найти :("}
          </div>
        </div>
        <Button htmlType="button" onClick={onClick}>
          Главная страница
        </Button>
      </div>
    </PageContainer>
  );
};
