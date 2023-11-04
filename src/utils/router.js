const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl, replace } = e.detail;
    if (nextUrl) {
      if (replace) {
        history.replaceState(null, null, nextUrl);
      } else {
        history.pushState(null, null, nextUrl);
      }
      onRoute();
    }
  });
};

export const pushRoute = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};
export const replaceRoute = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        replace: true,
        nextUrl,
      },
    })
  );
};
