import { ResponseUtils } from "utils/responseUtils";
import { getCookie, setCookie } from "utils/cookie";

import type * as Types from "./types";

const API_URL = "https://norma.nomoreparties.space/api";

const apiEndpoints = {
  ingredients: `${API_URL}/ingredients`,
  orders: `${API_URL}/orders`,
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  logout: `${API_URL}/auth/logout`,
  token: `${API_URL}/auth/token`,
  user: `${API_URL}/auth/user`,
  forgotPassword: `${API_URL}/password-reset`,
  resetPassword: `${API_URL}/password-reset/reset`,
};

type TApiRequest = {
  url: keyof typeof apiEndpoints;
  withToken?: boolean;
  options?: RequestInit;
} & ({ method: "GET" } | { method: "PATCH" | "POST"; data: object });

export const refreshToken = async (): Promise<Types.TUpdateResponse> => {
  const refreshToken = getCookie("refreshToken");

  try {
    const refresh = await fetch(apiEndpoints.token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken } as Types.TTokenRequest),
    });

    const result = await ResponseUtils.httpCheck<Types.TUpdateResponse>(
      refresh
    );

    if (result.success) {
      setCookie("accessToken", result.accessToken, 1);
      setCookie("refreshToken", result.refreshToken, 1);
    }
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const apiRequest = async <T = unknown>(params: TApiRequest): Promise<T> => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // refresh token
  if (params?.withToken) {
    try {
      const result = await refreshToken();

      defaultHeaders.authorization = result.accessToken;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const url = apiEndpoints[params.url];
    if (params.method === "GET") {
      const response = await fetch(url, {
        method: params.method,
        headers: defaultHeaders,
      });

      return ResponseUtils.httpCheck<T>(response);
    }

    const response = await fetch(url, {
      method: params.method,
      headers: defaultHeaders,
      body: JSON.stringify(params.data),
    });

    return ResponseUtils.httpCheck<T>(response);
  } catch (error) {
    return Promise.reject({ error: error });
  }
};

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<Types.TIngredientResponse> =>
    apiRequest<Types.TIngredientResponse>({
      url: "ingredients",
      method: "GET",
    }),

  /**
   * Создание заказа
   */
  postOrder: async (
    data: Types.TApiOrderRequest
  ): Promise<Types.TOrderResponse> =>
    apiRequest<Types.TOrderResponse>({
      url: "orders",
      method: "POST",
      data,
      withToken: true,
    }),
};

export const passwordApi = {
  /**
   * Проверка на наличие аккаунта с текущим email
   */
  forgotPassword: async (
    data: Types.TForgotRequest
  ): Promise<Types.TMessageResponse> =>
    apiRequest<Types.TMessageResponse>({
      url: "forgotPassword",
      method: "POST",
      data,
    }),

  /**
   * Сброс пароля
   */
  resetPassword: async (
    data: Types.TResetRequest
  ): Promise<Types.TMessageResponse> =>
    apiRequest<Types.TMessageResponse>({
      url: "resetPassword",
      method: "POST",
      data,
    }),
};

export const authApi = {
  /**
   * Авторизация
   */
  login: async (data: Types.TLoginRequest): Promise<Types.TAuthResponse> =>
    apiRequest<Types.TAuthResponse>({
      url: "login",
      method: "POST",
      data,
    }),

  /**
   * Регистрация
   */
  register: async (
    data: Types.TRegisterRequest
  ): Promise<Types.TAuthResponse> =>
    apiRequest<Types.TAuthResponse>({
      url: "register",
      method: "POST",
      data,
    }),

  /**
   * Выход из системы
   */
  logout: async (data: Types.TTokenRequest): Promise<Types.TMessageResponse> =>
    apiRequest<Types.TMessageResponse>({
      url: "logout",
      method: "POST",
      data,
    }),
};

export const userApi = {
  /**
   * Получить данные о пользователе
   */
  getUser: async (): Promise<Types.TUserApiResponse> =>
    apiRequest<Types.TUserApiResponse>({
      url: "user",
      method: "GET",
      withToken: true,
    }),

  /**
   * Обновить данные о пользователе
   */
  updateUser: async (data: Types.TUserData): Promise<Types.TUserApiResponse> =>
    apiRequest<Types.TUserApiResponse>({
      url: "user",
      method: "PATCH",
      data,
      withToken: true,
    }),
};
