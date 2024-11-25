import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import type { FC } from "react";

import classes from "./primaryButton.module.css";
import classNames from "classnames";

export const PrimaryButton: FC<{ text: string }> = ({ text }) => {
  return (
    <Button
      extraClass={classNames(classes["primary-button"])}
      htmlType="submit"
      type="primary">
      {text}
    </Button>
  );
};
