import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ERoutes } from "utils/routes";

import type { FormEventHandler, FC } from "react";

import classes from "./registerForm.module.css";
import classNames from "classnames";

export const RegisterForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
