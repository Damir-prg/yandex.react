import { mockIngredients } from "api/mocks/ingredients";
import type { TIngredient, TApiResponse } from "api/types";

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    return Promise.resolve({ data: mockIngredients });
  },

  /**
   * Получение ингредиента по ID
   * @param id string
   */
  getById: async (
    id: TIngredient["_id"]
  ): Promise<TApiResponse<TIngredient>> => {
    const ingredient = mockIngredients.find((item) => item._id === id);

    if (!ingredient) {
      return Promise.resolve({ error: "Не удалось найти ингредиент" });
    }

    return Promise.resolve({ data: ingredient });
  },
};
