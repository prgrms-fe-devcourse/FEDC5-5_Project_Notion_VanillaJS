const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = onRoute => {
  /** 커스텀 이벤트 */
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

/** url path를 변경하는 함수 */
export const navigate = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};
