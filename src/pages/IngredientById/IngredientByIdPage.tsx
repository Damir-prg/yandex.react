import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "components/IngredientsDetails";
import { useAppSelector } from "services/hooks";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./ingredientByIdPage.module.css";

export const IngredientByIdPage: FC = () => {
  const { id } = useParams();
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const selectedIngredient = useMemo(() => {
    const foundedIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );

    return foundedIngredient;
  }, [id, ingredients]);

  return (
    <PageContainer className={classes["ingredient-page"]}>
      {selectedIngredient ? (
        <IngredientDetails ingredient={selectedIngredient} />
      ) : (
        <h3 className="text text_type_main-medium">Ингредиент не найден</h3>
      )}
    </PageContainer>
  );
};
