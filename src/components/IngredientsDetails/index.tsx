import { TIngredient } from "api/types";
import { FC } from "react";

import classes from "./ingredientsDetails.module.css";

type TIngredientDetailsProps = {
  ingredient: TIngredient | null;
};

export const IngredientDetails: FC<TIngredientDetailsProps> = ({
  ingredient,
}) => {
  if (!ingredient) {
    return (
      <div className={classes["ingredients-details-wrapper"]}>
        К сожалению, ингредиент не найден
      </div>
    );
  }

  return (
    <div className={classes["ingredients-details-wrapper"]}>
      <figure className={classes["ingredients-details-figure"]}>
        <img src={ingredient.image} alt={`${ingredient.name} изображение`} />
        <figcaption className="text text_type_main-medium">
          {ingredient.name}
        </figcaption>
      </figure>
      <ul className={classes["ingredients-details-description"]}>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, калл
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={classes["ingredients-details-description-item"]}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
