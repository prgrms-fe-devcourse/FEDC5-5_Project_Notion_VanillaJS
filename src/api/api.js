import { API_END_POINT, X_USER_NAME } from "../../env.js";

export const instance = async (url = "", options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USER_NAME,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`요청을 실패했습니다. 상태 코드: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
