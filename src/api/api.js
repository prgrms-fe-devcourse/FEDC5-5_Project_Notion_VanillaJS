import { API_END_POINT, X_USER_NAME } from "../../config.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USER_NAME,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(`API ERROR - status ${res.status}`);
  } catch (error) {
    console.log(error);
  }
};

export const _GET = async (url) => {
  return await request(url, {});
};

export const _POST = async (url, data) => {
  return await request(url, { method: "POST", body: JSON.stringify(data) });
};

export const _PUT = async (url, data) => {
  return await request(url, { method: "PUT", body: JSON.stringify(data) });
};

export const _DELETE = async (url) => {
  return await request(url, { method: "DELETE" });
};
