import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { TIngredient } from "api/types";
import { ingredientsApi } from "api/ingredients";
import type { TIngredientContext } from "./IngredientsContext.type";

export const Ingredients = createContext<TIngredientContext>({
  isLoading: false,
});

export const IngredientsDataProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [ingredients, setIngredients] = useState<Array<TIngredient>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    const { data, success } = await ingredientsApi.getAll();

    if (success && data) {
      setIngredients(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Ingredients.Provider value={{ isLoading, ingredients, setIngredients }}>
      {children}
    </Ingredients.Provider>
  );
};
