const init = (onRouterChange) => {
  const callback = () => {
    const { pathname } = window.location;
    onRouterChange(pathname);
  };

  window.addEventListener("router-change", callback);
  window.addEventListener("popstate", callback);
};

const push = (url) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent("router-change", { detail: { url } }));
  return null;
};

const replace = (url) => {
  history.replaceState(null, null, url);
  window.dispatchEvent(new CustomEvent("router-change", { detail: { url } }));
  return null;
};

const router = {
  init,
  push,
  replace,
};

export default router;
