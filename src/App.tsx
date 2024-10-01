import { ConstructorPage } from "pages/Constructor/ConstructorPage";
import { IngredientsDataProvider } from "contexts/Ingredients/IngredientsContext";
import { SelectedIngredientsProvider } from "contexts/SelectedIngredients/SelectedIngredientsContext";
import { AppHeader } from "components/AppHeader";
import classes from "./app.module.css";

function App() {
  return (
    <main className={classes["main-wrapper"]}>
      <AppHeader />
      <IngredientsDataProvider>
        <SelectedIngredientsProvider>
          <ConstructorPage />
        </SelectedIngredientsProvider>
      </IngredientsDataProvider>
    </main>
  );
}

export default App;
