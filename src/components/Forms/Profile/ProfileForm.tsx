import { useEffect, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Spinner } from "components/Spinner";
import { useNavigate } from "react-router-dom";
import { useForm } from "hooks/useForm";
import { useEditableInput } from "hooks/useEditableInput";
import { ERoutes } from "utils/routes";
import { api } from "api/index";

import type { FC, FormEventHandler } from "react";

import classes from "../styles/forms.module.css";

export const ProfileForm: FC = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange, setForceFormState } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { editable, changeEditableStatus } = useEditableInput();
  const [loading, setLoading] = useState<boolean>(false);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const response = await api.getUser();

      if (response.success) {
        setForceFormState(response.user);
      } else {
        navigate(ERoutes.BASE);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <form className={classes["forms-wrapper"]} onSubmit={onSubmit}>
      <div className={classes["forms-inputs"]}>
        <Input
          type="text"
          value={formState.name}
          name="name"
          icon={"EditIcon"}
          onChange={(e) => editable.canEdit && handleInputChange(e)}
          onIconClick={changeEditableStatus}
          disabled={!editable.canEdit}
          placeholder="Имя"
        />
        <Input
          type="email"
          name="email"
          value={formState.email}
          icon={"EditIcon"}
          onChange={(e) => editable.canEdit && handleInputChange(e)}
          onIconClick={changeEditableStatus}
          disabled={!editable.canEdit}
          placeholder="E-mail"
        />
        <Input
          type={editable.canEdit ? "text" : "password"}
          value={formState.password}
          name="password"
          icon={"EditIcon"}
          disabled={!editable.canEdit}
          onIconClick={changeEditableStatus}
          onChange={(e) => editable.canEdit && handleInputChange(e)}
          placeholder="Пароль"
        />
      </div>
    </form>
  );
};
