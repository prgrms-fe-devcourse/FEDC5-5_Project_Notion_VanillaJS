import { canUseStorage } from "./canUseStorage.js";

function LocalStorage({ key, defaultValue }) {
  const canUseLocalStorage = canUseStorage("localstorage");

  this.getItem = () => {
    if (!canUseLocalStorage) {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      alert(error.message);
    }
  };

  this.setItem = (value) => {
    if (!canUseLocalStorage) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      alert(error.message);
    }
  };

  this.removeItem = () => {
    localStorage.removeItem(key);
  };
}

export const notionStorage = new LocalStorage({
  key: "notion-storage",
  defaultValue: [],
});
