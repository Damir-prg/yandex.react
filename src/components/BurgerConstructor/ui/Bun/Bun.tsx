import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { setSelectedBun } from "services/reducers/selectedIngredientsSlice";

import type { ComponentProps, FC } from "react";
import type { AppDispatch, RootState } from "services/store/store";

import classNames from "classnames";
import classes from "./bun.module.css";

type TBunProps = {
  orientation: Required<ComponentProps<typeof ConstructorElement>["type"]>;
};

export const Bun: FC<TBunProps> = ({ orientation }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBun } = useSelector(
    (state: RootState) => state.selectedIngredients
  );

  const handleClose = useCallback(() => {
    dispatch(setSelectedBun(null));
  }, [dispatch]);

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
        text={selectedBun.name}
        thumbnail={selectedBun.image}
        isLocked
        handleClose={handleClose}
      />
    </div>
  );
};
