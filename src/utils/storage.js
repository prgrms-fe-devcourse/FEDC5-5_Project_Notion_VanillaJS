// eslint-disable-next-line max-lines-per-function
export const initStorage = (key, defaultValue = [], storage = window.localStorage) => {
  const getItem = () => JSON.parse(storage.getItem(key)) || defaultValue;

  const setItem = (value) => storage.setItem(key, JSON.stringify(value));

  const appendItem = (value) => {
    const storedValue = getItem();
    const updatedValue = [...new Set([...storedValue, value])];

    storage.setItem(key, JSON.stringify(updatedValue));
  };

  const toggleItem = (value) => {
    const storedValue = getItem();
    const updatedValue = storedValue.includes(value)
      ? storedValue.filter((item) => item !== value)
      : [...storedValue, value];

    storage.setItem(key, JSON.stringify(updatedValue));
  };

  const deleteUniqueItem = (value) => {
    const storedValue = getItem();
    const updatedValue = [...storedValue.filter((id) => id !== value)];

    storage.setItem(key, JSON.stringify(updatedValue));
  };

  return { getItem, setItem, appendItem, toggleItem, deleteUniqueItem };
};
