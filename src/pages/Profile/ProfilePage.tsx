import { ProfileForm } from "components/Forms";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./profilePage.module.css";

export const ProfilePage: FC = () => {
  return (
    <PageContainer className={classes["profile-page"]}>
      <ProfileForm />
    </PageContainer>
  );
};
