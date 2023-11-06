import useStatePublisher from "./useStatePublisher.js";

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
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};

export const useDocument = new useStatePublisher({
  id: "",
  title: "",
  content: "",
  documents: [],
  createdAt: "",
  updatedAt: "",
  subscribers: [],
});

export const useDocsIndex = new useStatePublisher({
  data: null,
  flattenArrayData: null,
  flattenMapData: null,
  subscribers: [],
});

export const useToolbar = new useStatePublisher({
  visible: false,
  offsetX: 0,
  offsetY: 0,
  subscribers: [],
});
