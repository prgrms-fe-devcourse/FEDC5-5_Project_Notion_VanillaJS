const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl, type } = e.detail;
    const { pathname } = window.location;
    const state = e.detail.state ? e.detail.state : null;

    if (nextUrl && nextUrl !== pathname) {
      if(type === 'push') {
        history.pushState(state, null, nextUrl);
      } else {
        history.replaceState(state, null, nextUrl);
      }
      onRoute();
    }
  });
};

export const push = (nextUrl, state) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
        state,
        type: 'push'
      },
    })
  );
};

export const replace = (nextUrl, state) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
        state,
        type: 'replace'
      },
    })
  );
};
