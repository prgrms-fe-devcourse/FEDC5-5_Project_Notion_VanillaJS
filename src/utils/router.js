const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl, id) => {
  const detail = {
    nextUrl,
  };

  if (id !== undefined) {
    detail.id = id;
  }

  window.dispatchEvent(new CustomEvent("route-change", { detail }));
};
