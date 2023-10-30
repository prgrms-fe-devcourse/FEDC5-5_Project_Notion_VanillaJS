const storage = window.localStorage;

const handleException = (callback, defaultValue) => {
  try {
    return callback();
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

const getItem = (key, defaultValue) =>
  handleException(
    () => JSON.parse(storage.getItem(key)) || defaultValue,
    defaultValue
  );

const setItem = (key, value) =>
  handleException(() => storage.setItem(key, JSON.stringify(value)));

const removeItem = (key) => handleException(() => storage.removeItem(key));

export { getItem, setItem, removeItem };
