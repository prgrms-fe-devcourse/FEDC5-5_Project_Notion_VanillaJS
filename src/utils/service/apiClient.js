const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";
const X_USERNAME = "maru";

export const apiClient = async (url = "", options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USERNAME,
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }

    throw new Error("Api 호출 오류");
  } catch (err) {
    alert(err.message);
  }
};
