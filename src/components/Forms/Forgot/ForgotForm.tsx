import { useNavigate } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormFooter, PrimaryButton, Title } from "../ui";
import { ERoutes } from "utils/routes";
import { useForm } from "hooks/useForm";
import { passwordApi } from "api/index";

import type { FormEventHandler, FC, ComponentProps } from "react";

import classes from "../styles/forms.module.css";

const footerData: ComponentProps<typeof FormFooter>["data"] = [
  {
    linkText: "Войти",
    to: ERoutes.BASE + ERoutes.LOGIN,
    text: "Вспомнили пароль?",
  },
];

export const ForgotForm: FC = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange } = useForm({ email: "" });

  const forgotHandle = async () => {
    try {
      const response = await passwordApi.forgotPassword(formState);

      if (response.success) {
        navigate(ERoutes.BASE + ERoutes.RESET_PASSWORD);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    forgotHandle();
  };

  return (
    <form className={classes["forms-wrapper"]} onSubmit={onSubmit}>
      <div className={classes["forms-inputs"]}>
        <Title text="Восстановление пароля" />
        <Input
          type="text"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="Укажите e-mail"
        />
        <PrimaryButton text="Восстановить" />
      </div>
      <FormFooter data={footerData} />
    </form>
  );
};
