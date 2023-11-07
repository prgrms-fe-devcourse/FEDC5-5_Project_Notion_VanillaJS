export function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key, defaultValue = []) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.log("로컬 스토리지에 저장된 데이터가 없습니다.");
  }
}
