import { useCallback, useMemo } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { setSelectedBun } from "services/reducers/selectedIngredientsSlice";
import { useAppDispatch, useAppSelector } from "services/hooks";

import type { ComponentProps, FC } from "react";

import classNames from "classnames";
import classes from "./bun.module.css";

type TBunProps = {
  orientation: Required<ComponentProps<typeof ConstructorElement>["type"]>;
};

export const Bun: FC<TBunProps> = ({ orientation }) => {
  const dispatch = useAppDispatch();
  const { selectedBun } = useAppSelector((state) => state.selectedIngredients);

  const handleClose = useCallback(() => {
    dispatch(setSelectedBun(null));
  }, [dispatch]);

  const bunTitle = useMemo(() => {
    switch (orientation) {
      case "top":
        return selectedBun?.name + " (верх)";
      case "bottom":
        return selectedBun?.name + " (низ)";
      default:
        return selectedBun?.name || "";
    }
  }, [selectedBun, orientation]);

  if (!selectedBun) {
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
        price={selectedBun.price}
        text={bunTitle}
        thumbnail={selectedBun.image}
        isLocked
        handleClose={handleClose}
      />
    </div>
  );
};
