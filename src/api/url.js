export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
export const HEADERS = {
  "x-username": "yoonseo",
  "Content-Type": "application/json",
};

export const GET_API_DOCUMENT_TREE = "/documents";
export const POST_API_DOCUMENT = "/documents";
export const GET_API_DOCUMENT_DETAIL = (id) => `/documents/${id}`;
export const PUT_API_DOCUMENT = (id) => `/documents/${id}`;
export const DELETE_API_DOCUMENT = (id) => `/documents/${id}`;
