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

function App() {
  const dispatch = useAppDispatch();

  // Загрузка всех ингредиентов
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RouteWrapper />}>
        <Route path="" element={<ConstructorPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="ingredients/:id" element={<IngredientByIdPage />} />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
