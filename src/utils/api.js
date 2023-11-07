export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username' : 'test5'
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 처리 중 문제가 발생했습니다.');
  } catch (e) {
    console.error('e',e)
    alert('e.message');
  }
};
