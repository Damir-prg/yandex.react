import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ERoutes } from "utils/routes";
import { authApi } from "api/index";
import { useAppDispatch } from "services/hooks";
import { setCookie } from "utils/cookie";
import { setUser, setAuthStatus } from "services/reducers/userSlice";

import type { FC, FormEventHandler } from "react";

import classes from "./loginForm.module.css";
import classNames from "classnames";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const loginEvent = async () => {
    try {
      const response = await authApi.login({ email, password });

      if (response.success) {
        setCookie("accessToken", response.accessToken, 1);
        setCookie("refreshToken", response.refreshToken, 1);

        dispatch(setUser(response.user));
        dispatch(setAuthStatus(true));

        navigate(history.state.usr?.from || ERoutes.BASE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginEvent();
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
