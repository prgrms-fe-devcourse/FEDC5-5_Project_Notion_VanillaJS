import { userName } from './User.js';

export const DOCUMENT_API_ADDRESS = 'https://kdt-frontend.programmers.co.kr';
export const headers = {
    'Content-Type': 'application/json',
    'x-username': userName,
};
