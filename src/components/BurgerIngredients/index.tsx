import { useMemo, useState } from "react";
import { Spinner } from "components/Spinner";
import { useIngredients } from "contexts/Ingredients";
import { ETabs } from "./types/tabs.enum";
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from "./ui";

import classes from "./burgerIngredients.module.css";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const { ingredients, isLoading } = useIngredients();

  const buns = useMemo(
    () =>
      ingredients?.filter((ingredient) => ingredient.type === ETabs.BUN) || [],
    [ingredients]
  );

  const sauces = useMemo(
    () =>
      ingredients?.filter((ingredient) => ingredient.type === ETabs.SAUCE) ||
      [],
    [ingredients]
  );

  const mains = useMemo(
    () =>
      ingredients?.filter((ingredient) => ingredient.type === ETabs.MAIN) || [],
    [ingredients]
  );

  return (
    <section className={classes["burger-ingredients"]}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={classes["burger-ingredients-content"]}>
        {isLoading ? (
          <Spinner description="Загрузка ингредиентов..." />
        ) : (
          <>
            <IngredientsCategoryGroup items={buns} titleKey={ETabs.BUN} />
            <IngredientsCategoryGroup items={sauces} titleKey={ETabs.SAUCE} />
            <IngredientsCategoryGroup items={mains} titleKey={ETabs.MAIN} />
          </>
        )}
      </section>
    </section>
  );
};
