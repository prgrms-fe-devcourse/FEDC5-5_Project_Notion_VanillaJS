export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'hunoh',
      },
    });

    if (res.ok) {
      // await 빼먹으면 promise 리턴
      return await res.json();
    }
    throw new Error('API 처리중 뭔가 이상합니다.');
  } catch (e) {
    console.log(e.message);
  }
};
