import { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { setAuthStatus, setUser } from "services/reducers/userSlice";
import { ERoutes } from "utils/routes";
import { userApi } from "api/index";
import { Spinner } from "components/Spinner";

import type { FC } from "react";

export const ProtectedRoute: FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const checkUser = async () => {
    if (!userData.isAuth) {
      try {
        setLoading(true);
        const response = await userApi.getUser();

        if (response.success) {
          dispatch(setAuthStatus(true));
          dispatch(setUser(response.user));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useLayoutEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!userData.isAuth || !userData.user) {
    return <Navigate to={ERoutes.BASE + ERoutes.LOGIN} />;
  }

  return element;
};
