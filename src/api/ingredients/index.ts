import { checkResponse } from "utils/checkResponse";

import type {
  TIngredient,
  TApiResponse,
  TApiOrderRequest,
  TApiOrderResponse,
} from "api/types";

const apiUrl = "https://norma.nomoreparties.space/api";

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    const response = await fetch(`${apiUrl}/ingredients`);

    return checkResponse(response);
  },

  postOrder: async (data: TApiOrderRequest): Promise<TApiOrderResponse> => {
    const response = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },
};
