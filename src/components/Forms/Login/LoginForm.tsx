import { useNavigate } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormFooter, PrimaryButton, Title } from "../ui";
import { ERoutes } from "utils/routes";
import { authApi } from "api/index";
import { useAppDispatch } from "services/hooks";
import { useForm } from "hooks/useForm";
import { useEditableInput } from "hooks/useEditableInput";
import { setCookie } from "utils/cookie";
import { setUser, setAuthStatus } from "services/reducers/userSlice";

import type { ComponentProps, FC, FormEventHandler } from "react";

import classes from "../styles/forms.module.css";

const footerData: ComponentProps<typeof FormFooter>["data"] = [
  {
    text: "Вы - новый пользователь?",
    linkText: "Зарегистрироваться",
    to: ERoutes.BASE + ERoutes.REGISTER,
  },
  {
    text: "Забыли пароль?",
    linkText: "Восстановить пароль",
    to: ERoutes.BASE + ERoutes.RESET_PASSWORD,
  },
];

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });
  const { editable, changeEditableStatus } = useEditableInput();

  const loginEvent = async () => {
    try {
      const response = await authApi.login(formState);

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

  return (
    <form className={classes["forms-wrapper"]} onSubmit={onSubmit}>
      <div className={classes["forms-inputs"]}>
        <Title text="Вход" />
        <Input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="E-mail"
        />
        <Input
          type={editable.text}
          value={formState.password}
          name="password"
          icon={editable.icon}
          onIconClick={changeEditableStatus}
          onChange={handleInputChange}
          placeholder="Пароль"
        />
        <PrimaryButton text="Войти" />
      </div>
      <FormFooter data={footerData} />
    </form>
  );
};
