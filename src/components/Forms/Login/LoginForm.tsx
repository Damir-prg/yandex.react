import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ERoutes } from "utils/routes";

import type { FC, FormEventHandler } from "react";

import classes from "./loginForm.module.css";
import classNames from "classnames";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  return (
    <form className={classes["login-form"]} onSubmit={onSubmit}>
      <div className={classes["login-content"]}>
        <h3
          className={classNames(
            "text text_type_main-medium",
            classes["login-text-center"]
          )}>
          Вход
        </h3>
        <Input
          type="email"
          value={email}
          onChange={onEmailChanged}
          placeholder="E-mail"
        />
        <Input
          type={passwordType}
          value={password}
          icon={passwordType === "password" ? "ShowIcon" : "HideIcon"}
          onIconClick={() => {
            setPasswordType(passwordType === "password" ? "text" : "password");
          }}
          onChange={onPasswordChanged}
          placeholder="Пароль"
        />
        <Button
          htmlType="submit"
          type="primary"
          extraClass={classes["login-button"]}>
          Войти
        </Button>
      </div>
      <div className={classes["login-footer"]}>
        <p className={classes["login-text-center"]}>
          <span className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </span>{" "}
          <Link
            to={ERoutes.BASE + ERoutes.REGISTER}
            className={classNames(
              "text text_type_main-default",
              classes["login-link"]
            )}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={classes["login-text-center"]}>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>{" "}
          <Link
            to={ERoutes.BASE + ERoutes.RESET_PASSWORD}
            className={classNames(
              "text text_type_main-default",
              classes["login-link"]
            )}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};
