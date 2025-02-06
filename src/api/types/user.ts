import type { TBaseError } from "./base";

export type TPatchUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type TUserResponse =
  | {
      success: true;
      user: {
        email: string;
        name: string;
      };
    }
  | TBaseError;
