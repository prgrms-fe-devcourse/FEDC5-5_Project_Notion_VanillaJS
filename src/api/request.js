export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const requestInstance = async (url = '', options = {}) => {
	try {
		const res = await fetch(`${API_END_POINT}${url}`, {
			...options,
			headers: { 'Content-Type': 'application/json', 'x-username': 'youkyeong60' },
		});
		if (res.ok) {
			return await res.json();
		}
		throw new Error('API호출 오류');
	} catch (e) {
		return console.log(e.message);
	}
};
