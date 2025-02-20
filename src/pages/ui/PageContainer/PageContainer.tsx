import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

import classNames from "classnames";
import classes from "./pageContainer.module.css";

export const PageContainer: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ children, className, ...otherProps }) => {
  return (
    <section
      className={classNames(classes["page-container"], className)}
      {...otherProps}>
      {children}
    </section>
  );
};
