import { FormEventHandler, FC, ComponentProps } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { forgotPassword } from "services/reducers/passwordSlice";
import { ERoutes } from "utils/routes";
import { useForm } from "hooks/useForm";
import { FormFooter, PrimaryButton, Title } from "../ui";

import classes from "../styles/forms.module.css";

const footerData: ComponentProps<typeof FormFooter>["data"] = [
  {
    linkText: "Войти",
    to: ERoutes.BASE + ERoutes.LOGIN,
    text: "Вспомнили пароль?",
  },
];

export const ForgotForm: FC = () => {
  const location = useLocation();
  const passwordState = useAppSelector((state) => state.password);
  const dispatch = useAppDispatch();
  const { formState, handleInputChange } = useForm({ email: "" });
  const from = location.pathname || "/";

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(formState));
  };

  if (passwordState.isMailSend) {
    return (
      <Navigate to={ERoutes.BASE + ERoutes.RESET_PASSWORD} state={{ from }} />
    );
  }

  return (
    <form className={classes["forms-wrapper"]} onSubmit={onSubmit}>
      <div className={classes["forms-inputs"]}>
        <Title text="Восстановление пароля" />
        <Input
          type="text"
          name="email"
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
