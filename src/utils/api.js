export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "baekjunwon",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 요청 실패");
  } catch (e) {
    console.error(e);
  }
};

export const fetchDocuments = async (documentId = "", options) =>
  request(`${API_END_POINT}/documents${documentId ? `/${documentId}` : ""}`, options);
