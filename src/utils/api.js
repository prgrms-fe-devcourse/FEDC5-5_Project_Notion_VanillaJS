export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
const USERNAME = 'jaewoong';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'x-username': USERNAME },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출 오류');
  } catch (e) {
    alert(e.message);
  }
};

export const getDocument = async (documentId) => {
  const selectedDocument = await request(`/documents/${documentId}`, {
    method: 'GET',
  });

  return selectedDocument;
};

export const createDocument = async (documentId) => {
  const createdDocument = await request('/documents', {
    method: 'POST',
    body: JSON.stringify({ title: '새 문서', parent: documentId }),
  });

  return createdDocument;
};

export const deleteDocument = async (documentId) => {
  await request(`/documents/${documentId}`, {
    method: 'DELETE',
  });
};

export const modifyDocument = async ({ documentId, title, content }) => {
  await request(`/documents/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
  });
};
