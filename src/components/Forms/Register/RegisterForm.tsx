import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "services/hooks";
import { registerUser } from "services/reducers/userSlice";
import { ERoutes } from "utils/routes";
import { useForm } from "hooks/useForm";
import { useUserRedirect } from "hooks/useUserRedirect";
import { useEditableInput } from "hooks/useEditableInput";
import { FormFooter, PrimaryButton, Title } from "../ui";

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
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { editable, changeEditableStatus } = useEditableInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(registerUser(formState));
  };

  useUserRedirect();

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
