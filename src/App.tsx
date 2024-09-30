import classes from "./app.module.css";
import { AppHeader } from "components/AppHeader";
import { ConstructorPage } from "pages/Constructor/ConstructorPage";
import { IngredientsDataProvider } from "contexts/Ingredients/IngredientsContext";
import { SelectedIngredientsProvider } from "contexts/SelectedIngredients/SelectedIngredientsContext";

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
