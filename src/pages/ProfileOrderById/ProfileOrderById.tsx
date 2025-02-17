import { OrderByIdDetails } from "components/OrderByIdDetails";
import { PageContainer } from "pages/ui";
import { useEffect } from "react";
import { useAppDispatch } from "services/hooks";
import { wsOnConnecting, wsOnClose } from "services/reducers/userSlice";
import classes from "./profileOrderById.module.css";

export const ProfileOrderById = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className={classes["feed-by-id-page"]}>
      <OrderByIdDetails type="profile" />
    </PageContainer>
  );
};
