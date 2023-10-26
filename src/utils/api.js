import { HEADERS, API_END_POINT } from "./constants.js";

const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: HEADERS,
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error("API 처리 확인 필요");
  } catch (e) {
    alert(e.message);
  }
};

export const fetchGet = (url) => {
  return request(url);
};

export const fetchPost = (url, body) => {
  return request(url, { method: "POST", body: JSON.stringify(body) });
};

export const fetchPut = (url, body) => {
  return request(url, { method: "PUT", body: JSON.stringify(body) });
};

export const fetchDelete = (url) => {
  return request(url, { method: "DELETE" });
};
