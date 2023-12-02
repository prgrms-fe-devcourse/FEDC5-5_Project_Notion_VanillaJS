import { dispatchCustomEvent } from "./events";

export const navigateTo = (newPath: string) => {
  if (newPath === window.location.pathname) {
    return;
  }

  history.pushState({}, "", newPath);
  dispatchCustomEvent("navigate", { path: newPath });
};
