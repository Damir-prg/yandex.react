import { FC, useMemo } from "react";
import { useAppSelector } from "services/hooks";
import { TFeedOrderItem } from "api/types/feed";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrdersCardImage } from "./OrdersCardImage";

import classes from "./ordersCard.module.css";
import classNames from "classnames";

export const OrdersCardComponents: FC<Pick<TFeedOrderItem, "ingredients">> = ({
  ingredients,
}) => {
  const ingredientsHash = useAppSelector(
    (state) => state.ingredients.ingredientsHash
  );

  const price = useMemo(
    () =>
      ingredients.reduce((price, ingredientId) => {
        return price + ingredientsHash[ingredientId].price;
      }, 0),
    [ingredients, ingredientsHash]
  );

  const filteredComponents = useMemo(() => {
    return ingredients.reduce((components, ingredientId) => {
      if (
        ingredientsHash[ingredientId].type === "bun" &&
        components.includes(ingredientId)
      ) {
        return components;
      }

      if (components.length === 6) {
        return components;
      }

      return [...components, ingredientId];
    }, [] as string[]);
  }, []);

  return (
    <div className={classes["orders-card-components"]}>
      <ul className={classNames(classes["orders-card-components-image-list"])}>
        {filteredComponents.map((ingredientId, index) => (
          <OrdersCardImage
            key={ingredientId + index}
            index={index}
            {...ingredientsHash[ingredientId]}
            moreThanSixComponentsCount={
              index === 5 ? ingredients.length - 5 : null
            }
          />
        ))}
      </ul>
      <span
        className={classNames(
          classes["orders-card-components-price"],
          "text text_type_digits-default"
        )}>
        {price} <CurrencyIcon type="primary" />
      </span>
    </div>
  );
};
