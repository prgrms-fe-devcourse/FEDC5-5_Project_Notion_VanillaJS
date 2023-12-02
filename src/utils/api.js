import { RESPONSE_HEADER } from "./config.js";

export const request = async (url, options = {}) => {
  const { API_END_POINT, X_USERNAME } = RESPONSE_HEADER;

  try {
    const response = await fetch(`${API_END_POINT}${url ? `${url}` : ""}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        "x-username": X_USERNAME,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }

    throw new Error("API 처리 중 에러가 발생했습니다.");
  } catch (error) {
    console.log(error.message);
  }
};

export const documentsApi = () => {
  const getDocuments = async () => {
    return await request("/documents");
  };

  const getDocument = async (id) => {
    return await request(`/documents/${id}`);
  };

  const createDocument = async (title, parent) => {
    return await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title,
        parent,
      }),
    });
  };

  const updateDocument = async (id, title, content) => {
    return await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
    });
  };

  const deleteDocument = async (id) => {
    return await request(`/documents/${id}`, {
      method: "DELETE",
    });
  };

  return {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
  };
};
