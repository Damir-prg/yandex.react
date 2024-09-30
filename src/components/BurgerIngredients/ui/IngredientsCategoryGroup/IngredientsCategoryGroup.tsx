import { TIngredient } from "api/types";
import { FC } from "react";
import { IngredientCard } from "../IngredientCard/IngredientCard";
import { ETabs } from "../../types/tabs.enum";
import { titles } from "../../constants/titles";

import classes from "./ingredientsCategoryGroup.module.css";
import classNames from "classnames";

type TIngredientsCategoryGroupProps = {
  titleKey: ETabs;
  items: Array<TIngredient>;
};

export const IngredientsCategoryGroup: FC<TIngredientsCategoryGroupProps> = ({
  items,
  titleKey,
}) => {
  return (
    <article className={classes["category-group"]}>
      <h3
        className={classNames(
          "text text_type_main-medium",
          classes["category-group-title"]
        )}>
        {titles[titleKey]}
      </h3>
      <ul className={classes["category-group-content"]}>
        {items?.length ? (
          items.map((item) => (
            <li key={item._id}>
              <IngredientCard ingredient={item} />
            </li>
          ))
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            К сожалению, {titleKey.toLowerCase()} не найдены
          </p>
        )}
      </ul>
    </article>
  );
};
