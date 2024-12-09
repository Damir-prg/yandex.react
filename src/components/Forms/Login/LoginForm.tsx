import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormFooter, PrimaryButton, Title } from "../ui";
import { ERoutes } from "utils/routes";
import { useForm } from "hooks/useForm";
import { useEditableInput } from "hooks/useEditableInput";
import { useUserRedirect } from "hooks/useUserRedirect";
import { loginUser } from "services/reducers/userSlice";

import type { ComponentProps, FC, FormEventHandler } from "react";

import classes from "../styles/forms.module.css";
import { useAppDispatch } from "services/hooks";

const footerData: ComponentProps<typeof FormFooter>["data"] = [
  {
    text: "Вы - новый пользователь?",
    linkText: "Зарегистрироваться",
    to: ERoutes.BASE + ERoutes.REGISTER,
  },
  {
    text: "Забыли пароль?",
    linkText: "Восстановить пароль",
    to: ERoutes.BASE + ERoutes.FORGOT_PASSWORD,
  },
];

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });
  const { editable, changeEditableStatus } = useEditableInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(loginUser(formState));
  };

  useUserRedirect();

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
