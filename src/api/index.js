import CustomError from '@/core/Error';
import { parseToQueryString } from '@/utils/queryString';

const { BASE_URL, USER_NAME } = process.env;

const buildHeaders = (customHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    'x-username': USER_NAME,
    ...customHeaders,
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    throw new CustomError(String(res.status));
  }

  return res.json();
};

export const request = async ({ pathname, options = {}, payload = null, params = {} }) => {
  const headers = buildHeaders(options.headers);
  const body = payload ? JSON.stringify(payload) : null;
  const queryString = parseToQueryString(params);
  const url = `${BASE_URL}${pathname}${queryString}`;

  const res = await fetch(url, { ...options, headers, body });

  return await handleResponse(res);
};
