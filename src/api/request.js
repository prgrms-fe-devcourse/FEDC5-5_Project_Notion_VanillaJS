import { API_END_POINT } from '../constants/url.js';
import { API_REQUEST_ERROR } from '../constants/messages.js';

export const request = async (url, options = {}) => {
	try {
		const response = await fetch(`${API_END_POINT}${url}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				'x-username': 'mySpetialNotionV1',
			},
		});
		if (response.ok) return response.json();
		throw new Error(API_REQUEST_ERROR);
	} catch (error) {
		console.log(error.message);
	}
};
