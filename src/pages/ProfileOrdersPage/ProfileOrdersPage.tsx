import { PageContainer } from "pages/ui";

import classes from "./profileOrdersPage.module.css";
import { useAppDispatch } from "services/hooks";
import { wsOnConnecting, wsOnClose } from "services/reducers/userSlice";
import { useEffect } from "react";
import { UserOrdersList } from "components/User";

export const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className={classes["profile-orders-page"]}>
      <UserOrdersList />
    </PageContainer>
  );
};
