import { HTTP_METHODS } from "@/constants";

const BASE_URL = process.env.BASE_URL;

interface ApiRequest<T> {
  url: string;
  body?: T;
  options?: RequestInit;
}

const api = async (endPoint: string, options: RequestInit = {}) => {
  const headers = {
    "x-username": "soInseong_jaemin",
    "Content-Type": "application/json",
  };

  const response = await fetch(endPoint, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error("Network error");
  }

  return await response.json();
};

const createApiMethod =
  (method: string) =>
  <T, R>({ url, body, options }: ApiRequest<T>): Promise<R> => {
    const config: RequestInit = {
      ...options,
      method,
    };

    if (body || method !== HTTP_METHODS.GET) {
      config.body = JSON.stringify(body);
    }
    return api(`${BASE_URL}${url}`, config);
  };

export default {
  get: createApiMethod(HTTP_METHODS.GET),
  post: createApiMethod(HTTP_METHODS.POST),
  put: createApiMethod(HTTP_METHODS.PUT),
  delete: createApiMethod(HTTP_METHODS.DELETE),
};
