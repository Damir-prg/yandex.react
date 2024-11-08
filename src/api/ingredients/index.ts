import { checkResponse } from "utils/checkResponse";
import { apiEndpoints } from "../api";

import type {
  TIngredient,
  TApiResponse,
  TApiOrderRequest,
  TApiOrderResponse,
} from "api/types";

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    const response = await fetch(apiEndpoints.ingredients);

    return checkResponse(response);
  },

  /**
   * Создание заказа
   */
  postOrder: async (data: TApiOrderRequest): Promise<TApiOrderResponse> => {
    const response = await fetch(apiEndpoints.orders, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },
};
