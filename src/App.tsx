import classes from "./app.module.css";
import { AppHeader } from "components/AppHeader";

function App() {
  return (
    <main className={classes["main-wrapper"]}>
      <AppHeader />
    </main>
  );
}

export default App;
