export const getStorageData = (key, init) => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return init;
  }
  return JSON.parse(data);
};

export const setStorageData = (key, data) => {
  localStorage(key, JSON.stringify(data));
};

export const removeStorageData = (key) => {
  localStorage.removeItem(key);
};
