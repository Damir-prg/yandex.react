import { useAppSelector } from "services/hooks";
import classes from "./feedsList.module.css";
import { OrdersCard } from "../OrdersCard/index";
export const FeedList = () => {
  const orders = useAppSelector((state) => state.feeds.orders);

  if (!orders) return null;

  return (
    <ul className={classes["feed-list"]}>
      {orders.map((order) => (
        <OrdersCard key={order._id} {...order} />
      ))}
    </ul>
  );
};
