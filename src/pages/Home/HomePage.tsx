import { PageContainer } from "pages/ui";
import { BurgerIngredients } from "components/BurgerIngredients";
import { BurgerConstructor } from "components/BurgerConstructor";

import classes from "./homePage.module.css";

export const HomePage = () => {
  return (
    <PageContainer className={classes["constructor-page"]}>
      <BurgerIngredients />
      <BurgerConstructor />
    </PageContainer>
  );
};
