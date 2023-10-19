const storage = window.localStorage;

export const getItem = (key, defualtValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defualtValue;
  } catch (e) {
    alert(e.message);
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    alert(e.message);
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    alert(e.message);
  }
};
