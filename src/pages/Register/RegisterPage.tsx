import { RegisterForm } from "components/Forms";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./registerPage.module.css";

export const RegisterPage: FC = () => {
  return (
    <PageContainer className={classes["register-page"]}>
      <RegisterForm />
    </PageContainer>
  );
};
