import { useEffect, useLayoutEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  RouteWrapper,
  ProfileRouteWrapper,
  HomePage,
  ForgotPasswordPage,
  IngredientByIdPage,
  LoginPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  ProtectedRoute,
} from "pages/index";
import { initUser } from "services/reducers/userSlice";
import { loadIngredients } from "services/reducers/ingredientsSlice";
import { setOpenState } from "services/reducers/ingredientsModalSlice";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { ERoutes } from "utils/routes";
import { Spinner } from "components/Spinner";

import classes from "./app.module.css";
import { Modal } from "components/Modal";
import { IngredientDetails } from "components/IngredientsDetails";

function App() {
  const userInitLoading = useAppSelector((state) => state.user.initLoading);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const background = useMemo(() => {
    return location.state && location.state.background;
  }, [location]);

  useEffect(() => {
    if (background) {
      dispatch(setOpenState(true));
    }
    if (location.pathname === "/") {
      dispatch(setOpenState(false));
    }
  }, [background, location]);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
    dispatch(setOpenState(false));
  };

  const init = async () => {
    try {
      await dispatch(loadIngredients());
      await dispatch(initUser());
    } catch (error) {
      console.error(error);
    }
  };

  // Загрузка всех ингредиентов
  useLayoutEffect(() => {
    init();
  }, []);

  if (userInitLoading) {
    return (
      <main className={classes["full-screen"]}>
        <Spinner />
      </main>
    );
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path={ERoutes.BASE} element={<RouteWrapper />}>
          <Route path={ERoutes.HOME} element={<HomePage />} />
          <Route
            path={ERoutes.INGREDIENT_BY_ID}
            element={<IngredientByIdPage />}
          />
          <Route path={ERoutes.LOGIN} element={<LoginPage />} />
          <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
          <Route
            path={ERoutes.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={ERoutes.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />
          <Route
            path={ERoutes.PROFILE}
            element={<ProtectedRoute element={<ProfileRouteWrapper />} />}>
            <Route path={ERoutes.PROFILE_HOME} element={<ProfilePage />} />
            <Route path={ERoutes.PROFILE_ORDERS} element={<div />} />
            <Route path={ERoutes.PROFILE_ORDER_BY_ID} element={<div />} />
          </Route>
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
