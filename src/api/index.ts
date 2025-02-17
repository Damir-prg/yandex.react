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
  updateUser: async (
    data: TPatchUserRequest
  ): Promise<{ email: string; name: string }> =>
    request({
      url: "user",
      method: "PATCH",
      data,
    }),
};
