import classes from "./burgerConstructor.module.css";
import { ConstructorItems, ConstructorTotal } from "./ui";

export const BurgerCostructor = () => {
  return (
    <section className={classes["burger-constructor"]}>
      <ConstructorItems />
      <ConstructorTotal count={400} />
    </section>
  );
};
