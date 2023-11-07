const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const savedValue = storage.getItem(key);

    return savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.message);
  }
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
