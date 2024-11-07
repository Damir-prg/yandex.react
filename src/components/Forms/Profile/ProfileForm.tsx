import { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import type { FC, FormEventHandler } from "react";

import classes from "./profileForm.module.css";

export const ProfileForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [canEdit, setCanEdit] = useState<boolean>(false);

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
