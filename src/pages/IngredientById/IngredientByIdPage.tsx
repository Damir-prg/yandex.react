import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "components/IngredientsDetails";
import { useAppSelector } from "services/hooks";
import { PageContainer } from "../ui";

import type { FC } from "react";

import classes from "./ingredientByIdPage.module.css";

export const IngredientByIdPage: FC = () => {
  const { id } = useParams();
  const { ingredientsHash } = useAppSelector((state) => state.ingredients);

  const selectedIngredient = useMemo(() => {
    const foundedIngredient =
      typeof id === "string" ? ingredientsHash[id] : null;

    return foundedIngredient;
  }, [id, ingredientsHash]);

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
