import { Outlet } from "react-router-dom";
import { ProfileNavigation } from "components/ProfileNavigation";

import classes from "./profileRouteWrapper.module.css";

export const ProfileRouteWrapper = () => {
  return (
    <div className={classes["profile-route-wrapper"]}>
      <ProfileNavigation /> <Outlet />
    </div>
  );
};
