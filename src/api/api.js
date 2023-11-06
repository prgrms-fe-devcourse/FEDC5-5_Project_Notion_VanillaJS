import { API_END_POINT, HEADERS } from "./url.js";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: HEADERS,
    });
    if (res.ok) return await res.json();
    throw new Error("API 처리 중 에러 발생");
  } catch (error) {
    alert(error.message);
  }
};

const api = {
  get(url) {
    return request(url);
  },
  post(url, body) {
    return request(url, { method: "POST", body: JSON.stringify(body) });
  },
  put(url, body) {
    return request(url, { method: "PUT", body: JSON.stringify(body) });
  },
  delete(url) {
    return request(url, { method: "DELETE" });
  },
};

export default api;
