import { apiClient } from "./apiClient";

export const getPostList = async () => {
  const res = await apiClient("", { method: "GET" });
  return res;
};

export const getPost = async documentId => {
  const res = await apiClient(`/${documentId}`, { method: "GET" });
  return res;
};

export const createPost = async postBody => {
  const res = await apiClient("", {
    method: "POST",
    body: JSON.stringify(postBody),
  });
  return res;
};

export const updatePost = async (documentId, postBody) => {
  const res = await apiClient(`/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(postBody),
  });
  return res;
};

export const deletePost = async documentId => {
  const res = await apiClient(`/${documentId}`, {
    method: "DELETE",
  });
  return res;
};
