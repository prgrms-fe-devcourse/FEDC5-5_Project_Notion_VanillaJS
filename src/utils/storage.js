import { findDocumentFromTree, updateDocumentFromTree } from "./dataManager.js";
const SIDE_BAR_KEY = "side-bar";
const EDITING_POST_KEY = "editing-post";

export const getStorageData = (key, init) => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return init;
  }
  return JSON.parse(data);
};

export const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorageData = (key) => {
  localStorage.removeItem(key);
};

export const getSideBarData = () => {
  return getStorageData(SIDE_BAR_KEY, []);
};

export const setSideBarData = (data) => {
  setStorageData(SIDE_BAR_KEY, data);
};

export const removeSideBarData = () => {
  removeStorageData(SIDE_BAR_KEY);
};

export const getEditingPostData = (id) => {
  return getStorageData(EDITING_POST_KEY + id, {});
};

export const setEditingPostData = (id, data) => {
  setStorageData(EDITING_POST_KEY + id, data);
};

export const removeEditingPostData = (id) => {
  removeStorageData(EDITING_POST_KEY + id);
};

export function isDataInLocalStorage(id) {
  const data = getStorageData(SIDE_BAR_KEY, null);
  if (data === null) {
    return false;
  }
  const result = findDocumentFromTree(data, id);
  if (result) {
    return true;
  }
  return false;
}
