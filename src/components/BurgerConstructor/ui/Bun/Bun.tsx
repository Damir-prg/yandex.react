import { ComponentProps, FC } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectedIngredients } from "contexts/SelectedIngredients";
import type { TIngredient } from "api/types";

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
          classes["bun-rewrite"]
        )}>
        Булка не выбрана
      </div>
    );
  }

  return (
    <div className={classes["bun-rewrite"]}>
      <ConstructorElement
        type={orientation}
        price={bun.price}
        text={bun.name}
        thumbnail={bun.image}
        isLocked
        handleClose={() => setSelectedBun?.(null)}
      />
    </div>
  );
};
