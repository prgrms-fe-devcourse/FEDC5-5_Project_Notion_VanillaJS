const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
    try {
        const storagedValue = storage.getItem(key);
        return storagedValue ? JSON.parse(storage.getItem(key)) : defaultValue
    } catch(e) {
        return defaultValue;
    }
}

export const setItem = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
}

export const removeItem = (key) => {
    storage.removeItem(key);
}