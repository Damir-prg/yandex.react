import type { TBaseError } from "./types/base";

import { ResponseUtils } from "utils/responseUtils";
import { API_ENDPOINTS, TRequestParams } from "./config";
import { getCookie, setCookie } from "utils/cookie";

type TRefreshResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
};

export const refreshToken = async (): Promise<
  TRefreshResponse | TBaseError
> => {
  const refreshToken = getCookie("refreshToken");

  try {
    const refresh = await fetch(API_ENDPOINTS["token"], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    const result = await ResponseUtils.httpCheck<TRefreshResponse>(refresh);

    if (result.success) {
      setCookie("accessToken", result.accessToken, 1);
      setCookie("refreshToken", result.refreshToken, 1);
    }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const configureHeaders = () => {
  const accessToken = getCookie("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    authorization: accessToken,
  };

  return headers;
};

export const request = async <T = unknown>(
  params: TRequestParams
): Promise<T> => {
  try {
    const url = API_ENDPOINTS[params.url];

    const options: RequestInit = {
      method: params.method,
      ...params.options,
    };

    if (params.method !== "GET") {
      options.body = JSON.stringify(params.data);
    }

    options.headers = configureHeaders();
    const response = await fetch(url, options);

    const jsonResponse = await response.clone().json();

    if (!jsonResponse.success && jsonResponse.message.includes("token")) {
      await refreshToken();

      options.headers = configureHeaders();
      const retryResponse = await fetch(url, options);

      return ResponseUtils.httpCheck<T>(retryResponse);
    }

    if (jsonResponse.accessToken) {
      setCookie("accessToken", jsonResponse.accessToken, 1);
      setCookie("refreshToken", jsonResponse.refreshToken, 1);
    }

    return ResponseUtils.httpCheck<T>(response);
  } catch (error) {
    return Promise.reject({ error: error });
  }
};
