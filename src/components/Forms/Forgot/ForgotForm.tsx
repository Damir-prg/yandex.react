import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ERoutes } from "utils/routes";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import type { FormEventHandler, FC } from "react";

import classes from "./forgotForm.module.css";
import classNames from "classnames";

export const ForgotForm: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    navigate(ERoutes.BASE + ERoutes.RESET_PASSWORD);
  };

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  return (
    <form className={classes["forgot-password-form"]} onSubmit={onSubmit}>
      <div className={classes["forgot-password-content"]}>
        <h3
          className={classNames(
            "text text_type_main-medium",
            classes["forgot-password-text-center"]
          )}>
          Восстановление пароля
        </h3>
        <Input
          type="text"
          value={email}
          onChange={onEmailChanged}
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="submit"
          type="primary"
          extraClass={classes["forgot-password-button"]}>
          Восстановить
        </Button>
      </div>
      <div className={classes["forgot-password-footer"]}>
        <p className={classes["forgot-password-text-center"]}>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>{" "}
          <Link
            to={ERoutes.BASE + ERoutes.LOGIN}
            className={classNames(
              "text text_type_main-default",
              classes["forgot-password-link"]
            )}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};
