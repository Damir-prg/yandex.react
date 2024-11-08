const API_URL = "https://norma.nomoreparties.space/api";

export const apiEndpoints = {
  ingredients: `${API_URL}/ingredients`,
  orders: `${API_URL}/orders`,
  login: `${API_URL}/login`,
  authRegister: `${API_URL}/auth/register`,
  authLogout: `${API_URL}/auth/logout`,
  authToken: `${API_URL}/auth/token`,
  forgotPassword: `${API_URL}/password-reset`,
  resetPassword: `${API_URL}/password-reset/reset`,
};
