const storage = window.localStorage;

// 값을 가져오기
// key -> 불러올 값
// defaultValue -> 불러올 값이 없을 경우 세팅할 값)
export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// 값을 JSON.stringify형태로 저장
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

// 값 삭제
export const removeItem = (key) => {
  storage.removeItem(key);
};
