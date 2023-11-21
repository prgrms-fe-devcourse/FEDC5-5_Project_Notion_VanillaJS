import { ROUTE_CHANGE_EVENT, ROUTE_POPPED_EVENT } from "../constants/event.js";

export const initRouter = (onChangeRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (event) => {
    const { nextUrl, state } = event.detail;

    if (nextUrl) {
      history.pushState(state ? state : null, null, nextUrl);
      onChangeRoute();
    }
  });

  window.addEventListener(ROUTE_POPPED_EVENT, () => {
    onChangeRoute();
  });
};

export const navigate = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl,
      },
    })
  );
};
