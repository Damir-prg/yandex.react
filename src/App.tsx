import { useEffect } from "react";
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
      <ConstructorPage />
    </main>
  );
}

export default App;
