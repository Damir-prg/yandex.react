import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import { loadIngredients } from "services/reducers/ingredientsSlice";
import { useAppDispatch } from "services/hooks";
import { ERoutes } from "utils/routes";

function App() {
  const dispatch = useAppDispatch();

  // Загрузка всех ингредиентов
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <Routes>
      <Route path={ERoutes.BASE} element={<RouteWrapper />}>
        <Route path={ERoutes.HOME} element={<HomePage />} />
        <Route path={ERoutes.LOGIN} element={<LoginPage />} />
        <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
        <Route
          path={ERoutes.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route path={ERoutes.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route
          path={ERoutes.PROFILE}
          element={<ProtectedRoute element={<ProfileRouteWrapper />} />}>
          <Route path={ERoutes.PROFILE_HOME} element={<ProfilePage />} />
          <Route path={ERoutes.PROFILE_ORDERS} element={<div />} />
          <Route path={ERoutes.PROFILE_ORDER_BY_ID} element={<div />} />
        </Route>
        <Route
          path={ERoutes.INGREDIENT_BY_ID}
          element={<IngredientByIdPage />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
