const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents/";

export const request = async (url = "", options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "luka",
      },
    });

    if (response.ok) {
      return response.json();
    }

    throw new Error("Error while api request!");
  } catch (error) {
    console.log(error.message);
  }
};
