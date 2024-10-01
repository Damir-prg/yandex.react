import { ComponentProps, FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import { TIngredient } from "api/types";

import classNames from "classnames";
import classes from "./bun.module.css";

type TBunProps = {
  bun: TIngredient | null;
  orientation: Required<ComponentProps<typeof ConstructorElement>["type"]>;
};

export const Bun: FC<TBunProps> = ({ bun, orientation }) => {
  const { setSelectedBun } = useSelectedIngredients();

  if (!bun) {
    return (
      <div
        className={classNames(
          "text text_type_main-default",
          classes["empty-bun"],
          classes[`empty-bun_${orientation}`],
          classes["bun-margin"]
        )}>
        Булка не выбрана
      </div>
    );
  }

  const { image, name, price } = bun;

  return (
    <ConstructorElement
      type={orientation}
      price={price}
      text={name}
      thumbnail={image}
      extraClass={classes["bun-rewrite"]}
      isLocked
      handleClose={() => setSelectedBun?.(null)}
    />
  );
};
