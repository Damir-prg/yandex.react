import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "api/types";
import { FC } from "react";

import classes from "./detailsContent.module.css";
import classNames from "classnames";

export const DetailsContentListItem: FC<{
  count: number;
  ingredient: TIngredient;
}> = ({ count, ingredient }) => {
  return (
    <li className={classes["order-by-id-details-content-list-item"]}>
      <figure
        className={classes["order-by-id-details-content-list-image-wrapper"]}
        title={ingredient.name}>
        <img src={ingredient.image} alt={ingredient.name} />
      </figure>
      <span
        className={classNames(
          classes["order-by-id-details-content-list-name"],
          "text text_type_main-default"
        )}>
        {ingredient.name}
      </span>
      <div className={classes["order-by-id-details-content-list-price"]}>
        <span className="text text_type_digits-default">
          {count} x {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
};
