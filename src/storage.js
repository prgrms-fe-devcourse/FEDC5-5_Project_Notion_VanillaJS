const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        return defaultValue;
    }
};

export const setItem = (key, value) => {
    console.log(value);
    storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
    storage.removeItem(key);
};
