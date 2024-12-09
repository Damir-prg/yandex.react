// Responses
export type TIngredientResponse = {
  success: boolean;
  data: Array<TIngredient>;
};

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TMessageResponse = {
  success: boolean;
  message: string;
};

export type TAuthResponse = {
  success: boolean;
  user: Omit<TUserData, "password">;
} & TTokens;

export type TUserApiResponse = {
  success: boolean;
  user: Omit<TUserData, "password">;
};

export type TUpdateResponse = {
  success: boolean;
} & TTokens;

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TUserData = {
  email: string;
  name: string;
  password: string;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

// Requests

export type TApiOrderRequest = {
  ingredients: Array<string>;
};

export type TForgotRequest = {
  email: string;
};

export type TResetRequest = {
  password: string;
  token: string;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TTokenRequest = {
  token: string;
};
