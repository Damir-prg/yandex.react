import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { IngredientsDataProvider } from "contexts/Ingredients/IngredientsContext";
import { SelectedIngredientsProvider } from "contexts/SelectedIngredients/SelectedIngredientsContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IngredientsDataProvider>
      <SelectedIngredientsProvider>
        <App />
      </SelectedIngredientsProvider>
    </IngredientsDataProvider>
  </React.StrictMode>
);
