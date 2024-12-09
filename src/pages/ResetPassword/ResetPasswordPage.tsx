import { Navigate } from "react-router-dom";
import { useAppSelector } from "services/hooks";
import { ERoutes } from "utils/routes";
import { ResetForm } from "components/Forms";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./resetPasswordPage.module.css";

export const ResetPasswordPage: FC = () => {
  const passwordState = useAppSelector((state) => state.password);

  if (
    !passwordState.isMailSend ||
    history.state.usr?.from !== ERoutes.BASE + ERoutes.FORGOT_PASSWORD
  ) {
    return <Navigate to={ERoutes.BASE + ERoutes.FORGOT_PASSWORD} />;
  }

  if (passwordState.successReset) {
    return <Navigate to={ERoutes.BASE + ERoutes.LOGIN} />;
  }

  return (
    <PageContainer className={classes["reset-password-page"]}>
      <ResetForm />
    </PageContainer>
  );
};
