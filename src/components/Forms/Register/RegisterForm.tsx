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

import type { FormEventHandler, FC, ComponentProps } from "react";

import classes from "../styles/forms.module.css";

const footerData: ComponentProps<typeof FormFooter>["data"] = [
  {
    linkText: "Войти",
    to: ERoutes.BASE + ERoutes.LOGIN,
    text: "Уже зарегистрированы?",
  },
];

export const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { editable, changeEditableStatus } = useEditableInput();

  const registerEvent = async (): Promise<void> => {
    const response = await authApi.register(formState);

    if (response.success) {
      setCookie("accessToken", response.accessToken, 1);
      setCookie("refreshToken", response.refreshToken, 1);

      dispatch(setUser(response.user));
      dispatch(setAuthStatus(true));

      console.log(history.state.usr?.from);
      navigate(history.state.usr?.from || ERoutes.BASE);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    registerEvent();
  };

  return (
    <form className={classes["forms-wrapper"]} onSubmit={onSubmit}>
      <div className={classes["forms-inputs"]}>
        <Title text="Регистрация" />
        <Input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          placeholder="Имя"
        />
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
        <PrimaryButton text="Зарегистрироваться" />
      </div>
      <FormFooter data={footerData} />
    </form>
  );
};
