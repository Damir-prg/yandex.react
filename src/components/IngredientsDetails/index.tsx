import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TIngredient } from "api/types";

import classes from "./ingredientsDetails.module.css";
import { useAppSelector } from "services/hooks";

type TIngredientDetailsProps = {
  ingredient?: TIngredient | null;
};

export const IngredientDetails: FC<TIngredientDetailsProps> = ({
  ingredient,
}) => {
  const ingredients = useAppSelector((state) => state.ingredients);
  const { id } = useParams();

  const currentIngredient = useMemo(() => {
    if (ingredient) {
      return ingredient;
    }
    if (id) {
      return ingredients.ingredients.find((item) => item._id === id);
    }
    return;
  }, [ingredients, ingredient, id]);

  if (!currentIngredient) {
    return (
      <div className={classes["ingredients-details-wrapper"]}>
        К сожалению, ингредиент не найден
      </div>
    );
  }

  return (
    <div className={classes["ingredients-details-wrapper"]}>
      <figure className={classes["ingredients-details-figure"]}>
        <img
          src={currentIngredient.image_large}
          alt={`${currentIngredient.name} изображение`}
        />
        <figcaption className="text text_type_main-medium">
          {currentIngredient.name}
        </figcaption>
      </figure>
      <ul className={classes["ingredients-details-description"]}>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, калл
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.calories}
          </p>
        </li>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.proteins}
          </p>
        </li>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.fat}
          </p>
        </li>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
