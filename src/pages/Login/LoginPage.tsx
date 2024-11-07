import { LoginForm } from "components/Forms";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./loginPage.module.css";

export const LoginPage: FC = () => {
  return (
    <PageContainer className={classes["login-page"]}>
      <LoginForm />
    </PageContainer>
  );
};
