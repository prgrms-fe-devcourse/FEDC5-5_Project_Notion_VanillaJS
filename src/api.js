export const X_USERNAME = "bel1c10ud";

export const API_ENDPOINT = "https://kdt-frontend.programmers.co.kr";

export const asyncDataObj = { isLoading: false, isError: false, data: null };

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}${url}`, {
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USERNAME,
      },
      ...options,
    });

    if (res.ok) {
      const json = await res.json();
      return json;
    }

    throw new Error("API 처리 실패!");
  } catch (e) {
    alert(e);
  }
};
