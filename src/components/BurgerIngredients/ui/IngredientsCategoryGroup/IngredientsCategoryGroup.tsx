import { FC } from "react";
import { TIngredient } from "api/types";
import { IngredientCard } from "../IngredientCard/IngredientCard";
import { ETabs } from "../../types/tabs.enum";
import { titles } from "../../constants/titles";

import classNames from "classnames";
import classes from "./ingredientsCategoryGroup.module.css";

type TIngredientsCategoryGroupProps = {
  titleKey: ETabs;
  items: Array<TIngredient>;
};

export const IngredientsCategoryGroup: FC<TIngredientsCategoryGroupProps> = ({
  items,
  titleKey,
}) => {
  return (
    <div className={classes["category-group"]}>
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
            К сожалению, {titles[titleKey].toLowerCase()} не найдены
          </p>
        )}
      </ul>
    </div>
  );
};
