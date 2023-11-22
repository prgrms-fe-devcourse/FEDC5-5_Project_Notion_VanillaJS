import { USER_NAME } from "./key.js";

const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": USER_NAME,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const { status } = res;
      if (status >= 400 && status < 500) {
        // 클라이언트 관련 에러 처리
        switch (status) {
          case 404:
            console.error("Client error: Invalid approach", status);
            break;

          default:
            console.error("Client error", status);
            break;
        }
      } else if (status >= 500) {
        // 서버 관련 에러 처리
        console.error("Server error", status);
      } else {
        // 기타 에러 처리
        console.error("Unexpected error", status);
      }
    }

    return await res.json();
  } catch (e) {
    throw new Error(`API Error: ${e.message}`);
  }
};

// delete
export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};

// post
export const insertDocument = async (data) => {
  const res = await request("/documents", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
};

// get
export const getDocument = async (id) => {
  const res = await request(`/documents/${id}`, {
    method: "GET",
  });

  return res;
};

// put
export const updateDocument = async ({ id, title, content }) => {
  const res = await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });

  return res;
};
