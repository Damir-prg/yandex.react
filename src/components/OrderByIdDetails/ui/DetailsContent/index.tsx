import { TFeedOrderItem } from "api/types/feed";
import { FC } from "react";

import { DetailsContentHeader } from "./DetailsContentHeader";
import { DetailsContentListItem } from "./DetailsContentListItem";

import classes from "./detailsContent.module.css";
import { TIngredient } from "api/types";

export const DetailsContent: FC<
  Pick<TFeedOrderItem, "name" | "status"> & {
    ingredients: { ingredient: TIngredient; count: number }[];
  }
> = ({ ingredients, name, status }) => {
  return (
    <div className={classes["order-by-id-details-content-wrapper"]}>
      <DetailsContentHeader name={name} status={status} />

      <div className={classes["order-by-id-details-content-list-wrapper"]}>
        <h4 className="text text_type_main-medium">Состав: </h4>

        <ul className={classes["order-by-id-details-content-list"]}>
          {ingredients.map(({ count, ingredient }) => (
            <DetailsContentListItem
              key={ingredient._id}
              count={count}
              ingredient={ingredient}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
