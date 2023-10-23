const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        "x-username": "jaejoon",
      },
    });
    if (response.ok) {
      const json = response.json();
      return json;
    } else {
      throw new Error("api통신 오류");
    }
  } catch (e) {
    console.log(e.message);
  }
};
