import classes from "./app.module.css";
import { AppHeader } from "components/AppHeader";
import { ConstructorPage } from "pages/Constructor/ConstructorPage";

function App() {
  return (
    <main className={classes["main-wrapper"]}>
      <AppHeader />
      <ConstructorPage />
    </main>
  );
}

export default App;
