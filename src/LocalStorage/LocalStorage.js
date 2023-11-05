const STORAGE_NAME = "SAVE_DATA_";
const TOGGLE_LIST_NAME = "TOGGLED_ITEM";

export function setStorage(pageData) {
  try {
    const updatedAt = new Date();
    const newData = JSON.stringify({ ...pageData, updatedAt });
    localStorage.setItem(`${STORAGE_NAME}${pageData.id}`, newData);
  } catch (e) {
    console.error("Local data save 실패");
  }
}

export function removeStorage(id) {
  try {
    localStorage.removeItem(`${STORAGE_NAME}${id}`);
  } catch (e) {
    console.error("Local data save 실패");
  }
}

export function getStorage(id) {
  try {
    return JSON.parse(localStorage.getItem(`${STORAGE_NAME}${id}`));
  } catch (e) {
    console.error("Local data load 실패");
  }
}

/* toggle 가져오기 */
export function getToggleList() {
  try {
    return JSON.parse(localStorage.getItem(TOGGLE_LIST_NAME)) ?? [];
  } catch (e) {
    console.error("Toggled Local List 로딩 실패");
  }
}

/* toggle 추가 */
export function setToggleList(id) {
  try {
    const getData = getToggleList();
    const newData = JSON.stringify([...getData, id]);
    localStorage.setItem(TOGGLE_LIST_NAME, newData);
  } catch (e) {
    console.error("Toggled Local set 실패");
  }
}

/* toggle 삭제 */
export function removeToggleList(id) {
  try {
    const getData = getToggleList();
    const newData = JSON.stringify(getData.filter((item) => item !== id));
    localStorage.setItem(TOGGLE_LIST_NAME, newData);
  } catch (e) {
    console.error("Toggled Local remove 실패");
  }
}

/* is toggle? */
export function isCheckedToggled(id) {
  if (typeof id === "number") {
    id = id.toString();
  }
  const toggledList = getToggleList();
  return toggledList.includes(id);
}
