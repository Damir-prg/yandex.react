import { ForgotForm } from "components/Forms";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./forgotPasswordPage.module.css";

export const ForgotPasswordPage: FC = () => {
  return (
    <PageContainer className={classes["forgot-password-page"]}>
      <ForgotForm />
    </PageContainer>
  );
};
