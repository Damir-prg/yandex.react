import type { TBaseError } from "./base";

export type TLogoutRequest = {
  token: string;
};

export type TLogoutResponse =
  | {
      success: true;
      message: string;
    }
  | TBaseError;
