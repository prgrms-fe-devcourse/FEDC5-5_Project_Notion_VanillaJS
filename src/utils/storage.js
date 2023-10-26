import { flatSideBarData } from "./dataManager.js";

const EDITING_POST_KEY = "editing-post";
const FLAT_SIDE_BAR_KEY = "flat-side-bar";

// localStorage 에서 데이터를 가져오는 함수입니다.
const getStorageData = (key, init) => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return init;
  }
  return JSON.parse(data);
};

// 로컬 스토리지에 데이터를 저장하는 함수입니다.
const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// 로컬 스토리지에서 데이터를 삭제하는 함수입니다.
const removeStorageData = (key) => {
  localStorage.removeItem(key);
};

// getStorageData 함수를 이용한 인터페이스 함수입니다.
export const getEditingPostData = (id) => {
  return getStorageData(EDITING_POST_KEY + id, {});
};

// setStorageData 함수를 이용한 인터페이스 함수입니다.
export const setEditingPostData = (id, data) => {
  setStorageData(EDITING_POST_KEY + id, data);
};

// removeStorageData 함수를 이용한 인터페이스 함수입니다.
export const removeEditingPostData = (id) => {
  removeStorageData(EDITING_POST_KEY + id);
};

// setStorageData 함수를 이용한 인터페이스 함수입니다.
// flatSideBarData 함수를 이용해 데이터를 flat 하게 저장합니다.
export const setFlatSideBarData = (data) => {
  const flatData = flatSideBarData(data);
  setStorageData(FLAT_SIDE_BAR_KEY, flatData);
};

// getStorageData 함수를 이용한 인터페이스 함수입니다.
// flat Sidebar Data 를 가져옵니다.
export const getFlatSideBarData = () => {
  return getStorageData(FLAT_SIDE_BAR_KEY, []);
};
