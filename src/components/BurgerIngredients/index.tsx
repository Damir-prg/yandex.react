import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "components/Spinner";
import { ETabs } from "./types/tabs.enum";
import {
  IngredientsTabs,
  ConstructorTitle,
  IngredientsCategoryGroup,
} from "./ui";

import type { RootState } from "services/store/store";

import classes from "./burgerIngredients.module.css";

export const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState<ETabs>(ETabs.BUN);
  const { ingredients, loading } = useSelector(
    (state: RootState) => state.ingredients
  );

  const filteredItems = useMemo(() => {
    return {
      buns:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.BUN) ||
        [],
      sauces:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.SAUCE) ||
        [],
      mains:
        ingredients?.filter((ingredient) => ingredient.type === ETabs.MAIN) ||
        [],
    };
  }, [ingredients]);

  return (
    <section className={classes["burger-ingredients"]}>
      <ConstructorTitle />
      <IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={classes["burger-ingredients-content"]}>
        {loading ? (
          <Spinner description="Загрузка ингредиентов..." />
        ) : (
          <>
            <IngredientsCategoryGroup
              items={filteredItems.buns}
              titleKey={ETabs.BUN}
            />
            <IngredientsCategoryGroup
              items={filteredItems.sauces}
              titleKey={ETabs.SAUCE}
            />
            <IngredientsCategoryGroup
              items={filteredItems.mains}
              titleKey={ETabs.MAIN}
            />
          </>
        )}
      </section>
    </section>
  );
};
