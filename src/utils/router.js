const ROUTER_CHANGE_EVENT_NAME = "router-change";

// URL이 변경될 때 동작
export const initRouter = (onRouter) => {
  window.addEventListener(ROUTER_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRouter();
    }
  });
};

// URL 이동
export const triggerURLChange = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTER_CHANGE_EVENT_NAME, {
      detail: { nextUrl },
    })
  );
};
