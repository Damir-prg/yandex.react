import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ERoutes } from "utils/routes";
import { authApi } from "api/index";
import { setCookie } from "utils/cookie";
import { setUser, setAuthStatus } from "services/reducers/userSlice";

import type { FormEventHandler, FC } from "react";

import classes from "./registerForm.module.css";
import classNames from "classnames";
import { useAppDispatch } from "services/hooks";

export const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const registerEvent = async (): Promise<void> => {
    const response = await authApi.register({ name, email, password });

    if (response.success) {
      setCookie("accessToken", response.accessToken, 1);
      setCookie("refreshToken", response.refreshToken, 1);

      dispatch(setUser(response.user));
      dispatch(setAuthStatus(true));

      navigate(ERoutes.BASE);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    registerEvent();
  };

  const onNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
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
    <form className={classes["register-form"]} onSubmit={onSubmit}>
      <div className={classes["register-content"]}>
        <h3
          className={classNames(
            "text text_type_main-medium",
            classes["register-text-center"]
          )}>
          Регистрация
        </h3>
        <Input
          type="text"
          value={name}
          onChange={onNameChanged}
          placeholder="Имя"
        />
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
          extraClass={classes["register-button"]}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={classes["register-footer"]}>
        <p className={classes["register-text-center"]}>
          <span className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </span>{" "}
          <Link
            to={ERoutes.BASE + ERoutes.LOGIN}
            className={classNames(
              "text text_type_main-default",
              classes["register-link"]
            )}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};
