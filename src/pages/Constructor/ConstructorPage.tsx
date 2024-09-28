import { PageContainer } from "pages/ui";
import { BurgerIngredients } from "components/BurgerIngredients";

import classes from "./constructorPage.module.css";

export const ConstructorPage = () => {
  return (
    <PageContainer className={classes["constructor-page"]}>
      <BurgerIngredients />
    </PageContainer>
  );
};
