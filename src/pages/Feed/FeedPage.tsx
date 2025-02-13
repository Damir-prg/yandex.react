import { useEffect } from "react";
import { PageContainer } from "pages/ui";
import { FeedHeader, FeedInfo, FeedList } from "components/Feed";
import { wsOnConnecting, wsOnClose } from "services/reducers/feedSlice";
import { useAppDispatch } from "services/hooks";

import classes from "./feedPage.module.css";

export const FeedPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsOnConnecting());

    return () => {
      dispatch(wsOnClose());
    };
  }, []);

  return (
    <PageContainer className={classes["feed-page"]}>
      <FeedHeader />
      <div className={classes["feed-page-content"]}>
        <FeedList />
        <FeedInfo />
      </div>
    </PageContainer>
  );
};
