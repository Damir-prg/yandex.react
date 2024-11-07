import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  RouteWrapper,
  ConstructorPage,
  ForgotPasswordPage,
  IngredientByIdPage,
  LoginPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
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
        <Route path={ERoutes.HOME} element={<ConstructorPage />} />
        <Route path={ERoutes.LOGIN} element={<LoginPage />} />
        <Route path={ERoutes.REGISTER} element={<RegisterPage />} />
        <Route
          path={ERoutes.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route path={ERoutes.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ERoutes.PROFILE} element={<ProfilePage />} />
        <Route
          path={ERoutes.INGREDIENT_BY_ID}
          element={<IngredientByIdPage />}
        />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
