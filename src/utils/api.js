import { API_END_POINT } from "./endPoint.js";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "nahyun",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 중 뭔가 이상합니다!");
  } catch (e) {
    console.error(e.message);
    alert("서버와의 통신 중 문제가 발생했습니다.");
  }
};
