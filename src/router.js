export const ROUTE_CHANGE_EVENT = 'route-change';
export const ROUTE_REPLACE_EVENT = 'route-replace';
export const POP_STATE_EVENT = 'popstate';

// eslint-disable-next-line max-lines-per-function
export const addRouteChangeEvent = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    history.pushState(null, null, `${nextUrl}`);
    onRoute();
  });

  window.addEventListener(ROUTE_REPLACE_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    history.replaceState(null, null, `${nextUrl}`);
    onRoute();
  });
};

export const addPopstateEvent = (onRoute) => {
  window.addEventListener(POP_STATE_EVENT, () => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl,
      },
    }),
  );
};

export const replace = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_REPLACE_EVENT, {
      detail: {
        nextUrl,
      },
    }),
  );
};
