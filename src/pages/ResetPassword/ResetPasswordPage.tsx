import { ResetForm } from "components/Forms";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./resetPasswordPage.module.css";

export const ResetPasswordPage: FC = () => {
  return (
    <PageContainer className={classes["reset-password-page"]}>
      <ResetForm />
    </PageContainer>
  );
};
