import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import { ResponseUtils } from "utils/responseUtils";
import { getCookie } from "utils/cookie";

export type TWsActionTypes<MessageType> = {
  disconnect: ActionCreatorWithoutPayload;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<MessageType>;
};

export const createWsMiddleware =
  <MessageType>(
    url: string,
    wsActions: TWsActionTypes<MessageType>,
    withRefreshToken: boolean = false
  ): Middleware<{}, RootState> =>
  (store) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;
    return (next) => (action) => {
      const { dispatch } = store;

      if (wsActions.onConnecting.match(action) && !socket) {
        const accessToken = getCookie("accessToken");
        const socketUrl =
          withRefreshToken && accessToken
            ? url + "?token=" + accessToken.replace("Bearer ", "")
            : url;
        socket = new WebSocket(socketUrl);
        isConnected = true;
        dispatch(wsActions.onConnecting());

        socket.onopen = () => {
          dispatch(wsActions.onOpen());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const response = ResponseUtils.wsCheck(data);

          dispatch(wsActions.onMessage(response));
        };

        socket.onclose = () => {
          dispatch(wsActions.onClose());
        };
      }

      if (wsActions.disconnect.match(action) && !!socket && isConnected) {
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
