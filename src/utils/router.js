const ROUTER_CHANGE_EVENT_NAME = "router-change";

export const initRouter = (onRouter) => {
  window.addEventListener(ROUTER_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRouter();
    }
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTER_CHANGE_EVENT_NAME, {
      detail: { nextUrl },
    })
  );
};
