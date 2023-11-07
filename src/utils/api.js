const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const USERNAME = "hrdata";

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": USERNAME,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    alert("API 통신 중 에러 발생");
  }
};
