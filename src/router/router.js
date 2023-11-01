const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      window.history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  // 전역 상태 관리를 위함
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        nextUrl,
      },
    }),
  );
};
