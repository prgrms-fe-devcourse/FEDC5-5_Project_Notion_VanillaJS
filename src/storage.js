const storage = window.localStorage;

export const getItem = (key, defalutvalue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defalutvalue;
  } catch (e) {
    return defalutvalue;
  }
};
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
