import type { TBaseError } from "./base";

export type TCreateOrderRequest = {
  ingredients: Array<string>;
};

export type TCreateOrderResponse =
  | {
      success: true;
      name: string;
      order: {
        number: number;
      };
    }
  | TBaseError;
