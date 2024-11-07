import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AppHeader } from "components/AppHeader";
import { ConstructorPage } from "pages/Constructor/ConstructorPage";
import { loadIngredients } from "services/reducers/ingredientsSlice";
import { useAppDispatch } from "services/hooks";

import classes from "./app.module.css";

function App() {
  const dispatch = useAppDispatch();

  // Загрузка всех ингредиентов
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <main className={classes["main-wrapper"]}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/login" element={<div />} />
        <Route path="/register" element={<div />} />
        <Route path="/forgot-password" element={<div />} />
        <Route path="/reset-password" element={<div />} />
        <Route path="/profile" element={<div />} />
        <Route path="/ingredients/:id" element={<div />} />
        <Route path="*" element={<div />} />
      </Routes>
    </main>
  );
}

export default App;
