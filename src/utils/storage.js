const storage = window.localStorage;

export const setItem = (key, value) => {
    try {
        storage.setItem(key, JSON.stringify(value))
    } catch(e) {
        console.log(e);
    }
}

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch(e) {
        return defaultValue;
    }
}

export const removeItem = (key) => {
    storage.removeItem(key);
}