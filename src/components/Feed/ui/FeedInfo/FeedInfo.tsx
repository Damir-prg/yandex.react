import { useMemo } from "react";
import { useAppSelector } from "services/hooks";
import { DateUtils } from "utils/dateUtils";

import classes from "./feedInfo.module.css";

import { OrdersNumberList } from "../OrdersNumberList/OrdersNumberList";
import { OrdersCount } from "../OrdersCount/OrdersCount";

export const FeedInfo = () => {
  const orders = useAppSelector((state) => state.feeds.orders);
  const { total, totalToday } = useAppSelector((state) => ({
    total: state.feeds.total,
    totalToday: state.feeds.totalToday,
  }));

  const { todayDoneOrders, todayPendingOrders } = useMemo(() => {
    return {
      todayDoneOrders: orders.filter(
        (order) =>
          order.status === "done" &&
          DateUtils.isDateInLast24Hours(order.createdAt)
      ),
      todayPendingOrders: orders.filter(
        (order) =>
          order.status === "pending" &&
          DateUtils.isDateInLast24Hours(order.createdAt)
      ),
    };
  }, [orders]);

  return (
    <section className={classes["feed-info"]}>
      <div className={classes["feed-info-orders"]}>
        <OrdersNumberList
          title="Готовы:"
          isDone
          numbers={todayDoneOrders.map((order) => order.number)}
        />
        <OrdersNumberList
          title="В работе:"
          numbers={todayPendingOrders.map((order) => order.number)}
        />
      </div>
      {total && <OrdersCount title="Выполнено за все время:" count={total} />}
      {totalToday && (
        <OrdersCount title="Выполнено за сегодня:" count={totalToday} />
      )}
    </section>
  );
};
