import { useEffect, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import type { FC, FormEventHandler } from "react";

import classes from "./profileForm.module.css";
import { userApi } from "api/index";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "utils/routes";
import { Spinner } from "components/Spinner";

export const ProfileForm: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const response = await userApi.getUser();

      if (response.success) {
        setName(response.user.name);
        setEmail(response.user.email);
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

  const onNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (canEdit) {
      const { value } = event.target;
      setName(value);
    }
  };

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (canEdit) {
      const { value } = event.target;
      setEmail(value);
    }
  };

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (canEdit) {
      const { value } = event.target;
      setPassword(value);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <form className={classes["profile-form"]} onSubmit={onSubmit}>
      <div className={classes["profile-content"]}>
        <Input
          type="text"
          value={name}
          icon={"EditIcon"}
          onChange={onNameChanged}
          onIconClick={() => setCanEdit((state) => !state)}
          disabled={!canEdit}
          placeholder="Имя"
        />
        <Input
          type="email"
          value={email}
          icon={"EditIcon"}
          onChange={onEmailChanged}
          onIconClick={() => setCanEdit((state) => !state)}
          disabled={!canEdit}
          placeholder="E-mail"
        />
        <Input
          type={canEdit ? "text" : "password"}
          value={password}
          icon={"EditIcon"}
          disabled={!canEdit}
          onIconClick={() => setCanEdit((state) => !state)}
          onChange={onPasswordChanged}
          placeholder="Пароль"
        />
      </div>
    </form>
  );
};
