import { PageContainer } from "pages/ui";
import { BurgerIngredients } from "components/BurgerIngredients";
import { BurgerConstructor } from "components/BurgerConstructor";

import classes from "./constructorPage.module.css";

export const ConstructorPage = () => {
  return (
    <PageContainer className={classes["constructor-page"]}>
      <BurgerIngredients />
      <BurgerConstructor />
    </PageContainer>
  );
};
