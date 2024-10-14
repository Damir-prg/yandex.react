export type TApiResponse<T> = {
  data?: T;
  success: boolean;
};

export type TApiOrderRequest = {
  ingredients: Array<string>;
};

export type TApiOrderResponse = {
  name?: string;
  order?: {
    number: number;
  };
  success: boolean;
};
