import { request } from './request.js';

// API: Root Documents 가져오기
export const getRootDocuments = async () => {
  const response = await request();
  return response;
};

// API: 특정 Document의 content 조회하기
export const getSelectedDocument = async (id) => {
  const response = await request(`/${id}`);
  return response;
};

// API: Document 추가하기
export const addDocument = async (parentId) => {
  const response = await request('', {
    method: 'POST',
    body: {
      title: '제목 없음',
      parent: parentId,
    },
  });
  return response;
};

// API: 특정 Document 수정하기
export const editDocument = async (id, title, content) => {
  const response = await request(`/${id}`, {
    method: 'PUT',
    body: {
      title: title,
      content: content,
    },
  });
  return response;
};
// API: 특정 Document 삭제하기
export const removeDocument = async (id) => {
  const response = await request(`/${id}`, {
    method: 'DELETE',
  });
  return response;
};
