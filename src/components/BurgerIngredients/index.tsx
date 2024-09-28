import { useCallback, useEffect, useMemo, useState } from "react";
import { ETabs } from "./types/tabs.enum";
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from "./ui";

import classes from "./burgerIngredients.module.css";
import { TIngredient } from "api/types";
import { ingredientsApi } from "api/ingredients";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const [ingredients, setIngredients] = useState<Array<TIngredient>>([]);

  const buns = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === ETabs.BUN),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === ETabs.SAUCE),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === ETabs.MAIN),
    [ingredients]
  );

  const loadAndSetIngredients = useCallback(async () => {
    const ingredientsResponse = await ingredientsApi.getAll();

    if (ingredientsResponse?.error) {
      return;
    }

    if (ingredientsResponse?.data) {
      setIngredients(ingredientsResponse.data);
    }
  }, [ingredientsApi, setIngredients]);

  useEffect(() => {
    loadAndSetIngredients();
  }, []);

  return (
    <section className={classes["burger-ingredients"]}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={classes["burger-ingredients-content"]}>
        <IngredientsCategoryGroup items={buns} title={ETabs.BUN} />
        <IngredientsCategoryGroup items={sauces} title={ETabs.SAUCE} />
        <IngredientsCategoryGroup items={mains} title={ETabs.MAIN} />
      </section>
    </section>
  );
};
