const storage = window.localStorage;

export const getStorageItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeStorageItem = (key) => {
  storage.removeItem(key);
};
