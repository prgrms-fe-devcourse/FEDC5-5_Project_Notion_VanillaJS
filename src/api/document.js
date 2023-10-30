import { instance } from "./api.js";

/**
 * Root Documents 가져오기 (전체 Document의 구조를 트리 형태로 가져오기)
 * @async
 * @function getAllDocumentLists
 * @returns {Promise} - GET /documents
 */
const getAllDocumentLists = async () => {
  return await instance("/documents");
};

/**
 * 특정 Document의 content 조회하기
 * @async
 * @function getDocumentContent
 * @param {number} documentId - 조회할 Document의 ID
 * @returns {Promise} - GET /documents/{documentId}
 */
const getDocumentContent = async (documentId) => {
  return await instance(`/documents/${documentId}`);
};

/**
 * Document 생성하기
 * @async
 * @function createDocument
 * @param {Object} documentData - 생성할 Document의 데이터
 * @returns {Promise} - POST /documents
 */
const createDocument = async (documentData) => {
  return await instance("/documents", {
    method: "POST",
    body: JSON.stringify(documentData),
  });
};

/**
 * 특정 Document 수정하기
 * @async
 * @function updateDocument
 * @param {number} documentId - 수정할 Document의 ID
 * @param {Object} documentData - 수정할 Document의 데이터
 * @returns {Promise} - PUT /documents/{documentId}
 */
const updateDocument = async (documentId, documentData) => {
  return await instance(`/documents/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(documentData),
  });
};

/**
 * 특정 Document 삭제하기
 * @async
 * @function deleteDocument
 * @param {number} documentId - 삭제할 Document의 ID
 * @returns {Promise} - DELETE /documents/{documentId}
 */
const deleteDocument = async (documentId) => {
  return await instance(`/documents/${documentId}`, {
    method: "DELETE",
  });
};

export {
  getAllDocumentLists,
  getDocumentContent,
  createDocument,
  updateDocument,
  deleteDocument,
};
