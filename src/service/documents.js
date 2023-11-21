import { HTTP_METHOD } from "./api.js";
import { fetchAPI } from "./fetch.js";

const endPoint = "/documents";

export const getAllDocuments = () => fetchAPI(endPoint);

export const getDocument = (id) => fetchAPI(`${endPoint}/${id}`);

export const postDocument = ({ title, parent = null }) =>
  fetchAPI(endPoint, HTTP_METHOD.POST, {
    title,
    parent,
  });

export const updateDocument = ({ id, title, content }) =>
  fetchAPI(`${endPoint}/${id}`, HTTP_METHOD.PUT, {
    title,
    content,
  });

export const deleteDocument = (id) =>
  fetchAPI(`${endPoint}/${id}`, HTTP_METHOD.DELETE);
