import { ERoutes } from "utils/routes";
import { useForm } from "hooks/useForm";
import { useEditableInput } from "hooks/useEditableInput";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import type { FormEventHandler, FC, ComponentProps } from "react";

import classes from "../styles/forms.module.css";
import { FormFooter, Title, PrimaryButton } from "../ui";

const footerData: ComponentProps<typeof FormFooter>["data"] = [
  {
    text: "Вспомнили пароль?",
    to: ERoutes.BASE + ERoutes.LOGIN,
    linkText: "Войти",
  },
];

export const ResetForm: FC = () => {
  const { formState, handleInputChange } = useForm({ code: "", password: "" });
  const { editable, changeEditableStatus } = useEditableInput();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes["forms-wrapper"]} onSubmit={onSubmit}>
      <div className={classes["forms-inputs"]}>
        <Title text="Восстановление пароля" />
        <Input
          type={editable.text}
          name="password"
          value={formState.password}
          icon={editable.icon}
          onIconClick={changeEditableStatus}
          onChange={handleInputChange}
          placeholder="Введите новый пароль"
        />
        <Input
          type="text"
          name="code"
          value={formState.code}
          onChange={handleInputChange}
          placeholder="Введите код из письма"
        />
        <PrimaryButton text="Сохранить" />
      </div>
      <FormFooter data={footerData} />
    </form>
  );
};
