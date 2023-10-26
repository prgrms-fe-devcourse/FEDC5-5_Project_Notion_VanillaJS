const storage = window.localStorage

export const getItem = (key, defaultValue) => {
  try{
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue
  }catch(e){
    return defaultValue
  }
};

export const setItem = (key, defaultValue) => {
  storage.setItem(key, JSON.stringify(defaultValue))
};

export const removeItem = (key) => {
  storage.removeItem(key)
}