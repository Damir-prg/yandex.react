import { useState } from "react";
import { Link } from "react-router-dom";
import { ERoutes } from "utils/routes";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import type { FormEventHandler, FC } from "react";

import classes from "./resetForm.module.css";
import classNames from "classnames";

export const ResetForm: FC = () => {
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const onCodeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCode(value);
  };

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  return (
    <form className={classes["reset-password-form"]} onSubmit={onSubmit}>
      <div className={classes["reset-password-content"]}>
        <h3
          className={classNames(
            "text text_type_main-medium",
            classes["reset-password-text-center"]
          )}>
          Восстановление пароля
        </h3>

        <Input
          type={passwordType}
          value={password}
          icon={passwordType === "password" ? "ShowIcon" : "HideIcon"}
          onIconClick={() => {
            setPasswordType(passwordType === "password" ? "text" : "password");
          }}
          onChange={onPasswordChanged}
          placeholder="Введите новый пароль"
        />
        <Input
          type="text"
          value={code}
          onChange={onCodeChanged}
          placeholder="Введите код из письма"
        />
        <Button
          htmlType="submit"
          type="primary"
          extraClass={classes["reset-password-button"]}>
          Сохранить
        </Button>
      </div>
      <div className={classes["reset-password-footer"]}>
        <p className={classes["reset-password-text-center"]}>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>{" "}
          <Link
            to={ERoutes.BASE + ERoutes.LOGIN}
            className={classNames(
              "text text_type_main-default",
              classes["reset-password-link"]
            )}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};
