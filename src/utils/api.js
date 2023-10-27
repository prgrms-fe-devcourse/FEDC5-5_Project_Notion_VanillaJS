const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USERNAME = "Parkkyungbin";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        "x-username": X_USERNAME,
      },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error("요청에 실패하였습니다");
  } catch (e) {
    console.error(e);
  }
};