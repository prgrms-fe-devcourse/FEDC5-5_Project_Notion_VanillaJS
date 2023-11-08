import { API_END_POINT, USER_NAME } from "../env/apiIgnore.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": USER_NAME,
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (e) {
    throw new Error("API 오류");
  }
};
