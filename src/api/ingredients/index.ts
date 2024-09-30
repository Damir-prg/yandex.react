import type { TIngredient, TApiResponse } from "api/types";

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    const response = await fetch(
      "https://norma.nomoreparties.space/api/ingredients"
    );

    return response.json();
  },
};
