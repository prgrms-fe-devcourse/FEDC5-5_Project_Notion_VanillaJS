const localStorage = window.localStorage;

export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error.message);
    }
};

export const getItem = (key, defaultValue = []) => {
    try {
        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
};

export const removeItem = (key) => {
    localStorage.removeItem(key);
};

// document content 저장 키 동적 생성
export const DOCUMENT_CONTENT_SAVE_KEY = (documentId) => {
    return `DOCUMENT_CONTENT_SAVE_KEY_${documentId}`;
};

export const DOCUMENT_TOGGLE_KEY = 'DOCUMENT_TOGGLE_KEY';
