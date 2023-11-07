const storage = window.localStorage;

// 로컬 스토리지 저장
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

// 로컬 스토리지 데이터 get -> 데이터 존재 하지 않을 경우 디폴트 값 전달
export const getItem = (key, defaultValue) => {
  const localData = storage.getItem(key);

  if (localData) return JSON.parse(localData);

  return defaultValue;
};

// 로컬스토리지 키 삭제
export const removeItem = (key) => {
  storage.removeItem(key);
};
