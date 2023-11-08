import { DEFAULT_USERNAME, API_END_POINT } from "../../env.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": `${DEFAULT_USERNAME}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 중 오류 발생!!");
  } catch (error) {
    alert(error.message);
  }
};
