import type { TBaseError } from "./base";

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type TRegisterResponse =
  | {
      success: true;
      user: {
        email: string;
        name: string;
      };
      accessToken: string;
      refreshToken: string;
    }
  | TBaseError;
