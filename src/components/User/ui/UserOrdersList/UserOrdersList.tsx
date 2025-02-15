import { useAppSelector } from "services/hooks";
import classes from "./userOrdersList.module.css";
import { OrdersCard } from "components/Feed";

export const UserOrdersList = () => {
  const orders = useAppSelector((state) => state.user.orders);

  if (!orders) return null;

  return (
    <ul className={classes["user-orders-list"]}>
      {orders.map((order) => (
        <OrdersCard key={order._id} {...order} />
      ))}
    </ul>
  );
};
