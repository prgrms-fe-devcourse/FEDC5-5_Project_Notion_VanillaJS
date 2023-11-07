export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export async function request(url, options = {}) {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-type': 'application/json',
        'x-username': 'ikjun',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출 응답 이상');
  } catch (e) {
    alert(e.message);
  }
}
