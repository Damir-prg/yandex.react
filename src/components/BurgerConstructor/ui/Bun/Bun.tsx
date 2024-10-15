import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { setSelectedBun } from "services/reducers/selectedIngredientsSlice";

import type { TIngredient } from "api/types";
import type { ComponentProps, FC } from "react";
import type { AppDispatch } from "services/store/store";

import classNames from "classnames";
import classes from "./bun.module.css";

type TBunProps = {
  bun: TIngredient | null;
  orientation: Required<ComponentProps<typeof ConstructorElement>["type"]>;
};

export const Bun: FC<TBunProps> = ({ bun, orientation }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(setSelectedBun(null));
  }, [dispatch]);

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
        handleClose={handleClose}
      />
    </div>
  );
};
