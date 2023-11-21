export const canUseStorage = (type) => {
  const storage =
    type === "localstorage"
      ? globalThis.localStorage
      : globalThis.sessionStorage;

  if (storage == null) {
    return false;
  }

  try {
    const testItem = "__storage_test__";
    storage.setItem(testItem, testItem);
    storage.removeItem(testItem);

    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 || e.code === 1014) &&
      storage &&
      storage.length > 0 // 로컬스토리지 꽉 찼는지 검사
    );
  }
};
