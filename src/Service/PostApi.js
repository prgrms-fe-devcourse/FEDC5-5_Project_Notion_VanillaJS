import { DOCUMENT_API_ADDRESS, headers } from '../Constants/Api.js';

// document 데이터 추가하기
export const fetchPostDocument = async (parentId, title = '') => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ title, parent: parentId }),
        });

        if (res.status >= 400 && res.status < 500) {
            throw new Error('잘못된 요청입니다. 다시 시도해 주세요.');
        }

        if (res.status >= 500) {
            throw new Error('서버에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');
        }

        if (!res.ok) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document List 데이터 가져오기
export const fetchGetDocumentList = async () => {
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents`, {
            method: 'GET',
            headers,
        });

        if (res.status >= 400 && res.status < 500) {
            throw new Error('잘못된 요청입니다. 다시 시도해 주세요.');
        }

        if (res.status >= 500) {
            throw new Error('서버에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');
        }

        if (!res.ok) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document Content 데이터 가져오기
export const fetchGetDocumentContent = async (documentId) => {
    if (!documentId) {
        return;
    }
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents/${documentId}`, {
            method: 'GET',
            headers,
        });

        if (res.status >= 400 && res.status < 500) {
            throw new Error('잘못된 요청입니다. 다시 시도해 주세요.');
        }

        if (res.status >= 500) {
            throw new Error('서버에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');
        }

        if (!res.ok) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document 데이터 삭제하기
export const fetchDeleteDocument = async (documentId) => {
    if (!documentId) {
        return;
    }
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents/${documentId}`, { method: 'DELETE', headers });

        if (res.status >= 400 && res.status < 500) {
            throw new Error('잘못된 요청입니다. 다시 시도해 주세요.');
        }

        if (res.status >= 500) {
            throw new Error('서버에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');
        }

        if (!res.ok) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

// document 데이터 수정하기
export const fetchPutDocument = async (documentId, title, content) => {
    if (!documentId) {
        return;
    }
    try {
        const res = await fetch(`${DOCUMENT_API_ADDRESS}/documents/${documentId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers,
        });

        if (res.status >= 400 && res.status < 500) {
            throw new Error('잘못된 요청입니다. 다시 시도해 주세요.');
        }

        if (res.status >= 500) {
            throw new Error('서버에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');
        }

        if (!res.ok) {
            throw new Error('통신 실패!');
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};
