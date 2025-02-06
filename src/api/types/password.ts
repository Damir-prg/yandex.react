import type { TBaseError } from "./base";

export type TForgotRequest = {
  email: string;
};

export type TResetRequest = {
  password: string;
  token: string;
};

export type TForgotResponse =
  | {
      success: true;
      message: "Reset email sent";
    }
  | TBaseError;

export type TResetResponse =
  | {
      success: true;
      message: "Password successfully reset";
    }
  | TBaseError;
