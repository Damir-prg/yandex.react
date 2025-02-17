import type { TBaseError } from "./base";

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse =
  | {
      success: true;
      accessToken: string;
      refreshToken: string;
      user: {
        email: string;
        name: string;
      };
    }
  | TBaseError;
