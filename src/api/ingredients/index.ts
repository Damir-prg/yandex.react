import type { TIngredient, TApiResponse } from "api/types";

const apiUrl = "https://norma.nomoreparties.space/api";

export const ingredientsApi = {
  /**
   * Получение всех ингредиентов
   */
  getAll: async (): Promise<TApiResponse<Array<TIngredient>>> => {
    const response = await fetch(`${apiUrl}/ingredients`);
    if (response.ok) {
      return response.json();
    }
    return { success: false };
  },
};
