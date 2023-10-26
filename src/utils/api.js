export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-type': 'application/json',
        'x-username': 'kitty',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('요청에 실패했습니다.');
  } catch (e) {
    console.error(e);
  }
};

export const fetchDocuments = async (documentId, options) =>
  request(
    `${API_END_POINT}/documents${documentId ? `/${documentId}` : ''}`,
    options
  );
