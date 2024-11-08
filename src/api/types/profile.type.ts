export type TForgotRequest = {
  email: string;
};

export type TResetRequest = {
  password: string;
  token: string;
};

export type TProfileResponse = {
  success: boolean;
  message?: string;
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

export type TAuthResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TUpdateResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
