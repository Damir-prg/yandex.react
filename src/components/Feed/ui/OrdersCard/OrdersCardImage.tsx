import { TIngredient } from "api/types";
import { FC } from "react";
import classes from "./ordersCard.module.css";
import classNames from "classnames";

type TOrdersCardImageProps = TIngredient & {
  moreThanSixComponentsCount: number | null;
  index: number;
};

export const OrdersCardImage: FC<TOrdersCardImageProps> = ({
  image,
  name,
  moreThanSixComponentsCount,
  index,
}) => {
  return (
    <li
      className={classes["orders-card-components-image-list-item"]}
      style={{ transform: `translateX(-${index * 10}px)` }}
      title={name}>
      <figure className={classes["orders-card-components-image-wrapper"]}>
        <img src={image} alt={name} />
        {moreThanSixComponentsCount && (
          <figcaption
            className={classNames(
              classes["orders-card-components-image-preview"],
              "text text_type_digits-default"
            )}>
            +{moreThanSixComponentsCount}
          </figcaption>
        )}
      </figure>
    </li>
  );
};
