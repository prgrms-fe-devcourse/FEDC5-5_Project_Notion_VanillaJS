const storage = window.sessionStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return defaultValue;
  } catch (error) {
    console.log(error.message);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
