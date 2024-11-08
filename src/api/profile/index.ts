import { checkResponse } from "utils/checkResponse";
import { apiEndpoints } from "../api";

import type {
  TAuthResponse,
  TForgotRequest,
  TLoginRequest,
  TProfileResponse,
  TRegisterRequest,
  TResetRequest,
  TUpdateResponse,
  TTokenRequest,
} from "../types";

export const profileApi = {
  login: async (data: TLoginRequest): Promise<TAuthResponse> => {
    const response = await fetch(apiEndpoints.login, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },

  register: async (data: TRegisterRequest): Promise<TAuthResponse> => {
    const response = await fetch(apiEndpoints.authRegister, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },

  logout: async (data: TTokenRequest): Promise<TProfileResponse> => {
    const response = await fetch(apiEndpoints.authLogout, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },

  updateToken: async (data: TTokenRequest): Promise<TUpdateResponse> => {
    const response = await fetch(apiEndpoints.authToken, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },

  forgotPassword: async (data: TForgotRequest): Promise<TProfileResponse> => {
    const response = await fetch(apiEndpoints.forgotPassword, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },

  resetPassword: async (data: TResetRequest): Promise<TProfileResponse> => {
    const response = await fetch(apiEndpoints.resetPassword, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return checkResponse(response);
  },
};
