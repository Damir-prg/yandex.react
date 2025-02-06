import type { TIngredientResponse } from "./types/ingredients";
import type { TCreateOrderRequest, TCreateOrderResponse } from "./types/orders";
import type { TLoginRequest, TLoginResponse } from "./types/login";
import type { TRegisterRequest, TRegisterResponse } from "./types/register";
import type { TLogoutRequest, TLogoutResponse } from "./types/logout";
import type { TUserResponse, TPatchUserRequest } from "./types/user";
import type {
  TForgotRequest,
  TForgotResponse,
  TResetRequest,
  TResetResponse,
} from "./types/password";

import { request } from "./request";

import type * as Types from "./types";

export const api = {
  /**
   * Получение всех ингредиентов
   */
  getIngredients: async (): Promise<TIngredientResponse> =>
    request({
      url: "ingredients",
      method: "GET",
    }),

  /**
   * Создание заказа
   */
  createOrder: async (
    data: TCreateOrderRequest
  ): Promise<TCreateOrderResponse> =>
    request({
      url: "orders",
      method: "POST",
      data,
    }),

  /**
   * Проверка на наличие аккаунта с текущим email
   */
  forgotPassword: async (data: TForgotRequest): Promise<TForgotResponse> =>
    request({
      url: "forgotPassword",
      method: "POST",
      data,
    }),

  /**
   * Сброс пароля
   */
  resetPassword: async (data: TResetRequest): Promise<TResetResponse> =>
    request({
      url: "resetPassword",
      method: "POST",
      data,
    }),

  /**
   * Авторизация
   */
  login: async (data: TLoginRequest): Promise<TLoginResponse> =>
    request({
      url: "login",
      method: "POST",
      data,
    }),

  /**
   * Регистрация
   */
  register: async (data: TRegisterRequest): Promise<TRegisterResponse> =>
    request({
      url: "register",
      method: "POST",
      data,
    }),

  /**
   * Выход из системы
   */
  logout: async (data: TLogoutRequest): Promise<TLogoutResponse> =>
    request({
      url: "logout",
      method: "POST",
      data,
    }),

  /**
   * Получить данные о пользователе
   */
  getUser: async (): Promise<TUserResponse> =>
    request({
      url: "user",
      method: "GET",
    }),

  /**
   * Обновить данные о пользователе
   */
  updateUser: async (data: TPatchUserRequest): Promise<Types.TUserData> =>
    request({
      url: "user",
      method: "PATCH",
      data,
    }),
};

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<TIngredientResponse> =>
    request({
      url: "ingredients",
      method: "GET",
    }),

  /**
   * Создание заказа
   */
  postOrder: async (
    data: Types.TApiOrderRequest
  ): Promise<Types.TOrderResponse> =>
    request<Types.TOrderResponse>({
      url: "orders",
      method: "POST",
      data,
    }),
};

export const passwordApi = {
  /**
   * Проверка на наличие аккаунта с текущим email
   */
  forgotPassword: async (
    data: Types.TForgotRequest
  ): Promise<Types.TMessageResponse> =>
    request<Types.TMessageResponse>({
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
    request<Types.TMessageResponse>({
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
    request<Types.TAuthResponse>({
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
    request<Types.TAuthResponse>({
      url: "register",
      method: "POST",
      data,
    }),

  /**
   * Выход из системы
   */
  logout: async (data: Types.TTokenRequest): Promise<Types.TMessageResponse> =>
    request<Types.TMessageResponse>({
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
    request<Types.TUserApiResponse>({
      url: "user",
      method: "GET",
    }),

  /**
   * Обновить данные о пользователе
   */
  updateUser: async (data: Types.TUserData): Promise<Types.TUserApiResponse> =>
    request<Types.TUserApiResponse>({
      url: "user",
      method: "PATCH",
      data,
    }),
};
