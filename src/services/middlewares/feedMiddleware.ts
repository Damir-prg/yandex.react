import {
  wsOnClose,
  wsOnConnecting,
  wsOnMessage,
  wsOnOpen,
} from "../reducers/feedSlice";

import { createWsMiddleware } from "./createWsMiddleware";

export const feedWsMiddleware = createWsMiddleware(
  "wss://norma.nomoreparties.space/orders/all",
  {
    onConnecting: wsOnConnecting,
    onClose: wsOnClose,
    disconnect: wsOnClose,
    onMessage: wsOnMessage,
    onOpen: wsOnOpen,
  }
);
