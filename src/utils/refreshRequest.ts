import { checkResponse } from "./checkResponse";

export const refreshRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return checkResponse(response);
};
