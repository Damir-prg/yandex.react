import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "services/hooks";
import { ERoutes } from "utils/routes";

import type { FC } from "react";

export const ProtectedRoute: FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const userData = useAppSelector((state) => state.user);
  const location = useLocation();
  const from = location.state?.from || location.pathname || "/";

  if (!userData.isAuth) {
    return <Navigate to={ERoutes.BASE + ERoutes.LOGIN} state={{ from }} />;
  }

  return element;
};
