const domain = "norma.nomoreparties.space";

const protocol = {
  https: "https://",
  wss: "wss://",
};

const API_BASE: Record<keyof typeof protocol, string> = {
  https: protocol.https + domain,
  wss: protocol.wss + domain,
};

export const API_ENDPOINTS = {
  ingredients: `${API_BASE["https"]}/api/ingredients`,
  orders: `${API_BASE["https"]}/api/orders`,
  login: `${API_BASE["https"]}/api/auth/login`,
  register: `${API_BASE["https"]}/api/auth/register`,
  logout: `${API_BASE["https"]}/api/auth/logout`,
  token: `${API_BASE["https"]}/api/auth/token`,
  user: `${API_BASE["https"]}/api/auth/user`,
  forgotPassword: `${API_BASE["https"]}/api/password-reset`,
  resetPassword: `${API_BASE["https"]}/api/password-reset/reset`,
  ws: `${API_BASE["wss"]}/orders/all`,
};

export type TRequestParams = {
  url: keyof typeof API_ENDPOINTS;
  options?: Omit<RequestInit, "method">;
} & ({ method: "GET" } | { method: "PATCH" | "POST"; data: object });
