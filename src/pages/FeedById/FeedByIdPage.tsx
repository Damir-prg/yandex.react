import { useEffect } from "react";
import { useAppDispatch } from "services/hooks";
import { OrderByIdDetails } from "components/OrderByIdDetails";
import { wsOnConnecting, wsOnClose } from "services/reducers/feedSlice";

import { PageContainer } from "../ui";

import classes from "./feedByIdPage.module.css";

export const FeedByIdPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className={classes["feed-by-id-page"]}>
      <OrderByIdDetails type="feed" />
    </PageContainer>
  );
};
