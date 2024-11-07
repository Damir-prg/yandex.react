import { Outlet } from "react-router-dom";
import { AppHeader } from "components/AppHeader";

import type { FC } from "react";

import classes from "./routeWrapper.module.css";

export const RouteWrapper: FC = () => {
  return (
    <main className={classes["route-wrapper"]}>
      <AppHeader />
      <Outlet />
    </main>
  );
};
