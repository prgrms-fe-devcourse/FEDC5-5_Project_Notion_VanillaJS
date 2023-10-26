const RouterChangeEvent = new CustomEvent("router-change");

const init = (onRouterChange) => {
  const callback = () => {
    const { pathname } = window.location;
    onRouterChange(pathname);
  };

  window.addEventListener(RouterChangeEvent.type, callback);
  window.addEventListener("popstate", callback);
};

const push = (url) => {
  history.pushState(null, null, url);
  window.dispatchEvent(RouterChangeEvent);
  return null;
};

const replace = (url) => {
  history.replaceState(null, null, url);
  window.dispatchEvent(RouterChangeEvent);
  return null;
};

const router = {
  init,
  push,
  replace,
};

export default router;
