import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppHeader } from "components/AppHeader";
import { ConstructorPage } from "pages/Constructor/ConstructorPage";
import { loadIngredients } from "services/reducers/ingredientsSlice";

import type { AppDispatch } from "services/store/store";

import classes from "./app.module.css";

function App() {
  const dispatch: AppDispatch = useDispatch();

  // Загрузка всех ингредиентов
  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  return (
    <main className={classes["main-wrapper"]}>
      <AppHeader />
      <ConstructorPage />
    </main>
  );
}

export default App;
