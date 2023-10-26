const ROUTE_CHANGE_EVENT_NAME = "route-change";

export function InitRouter(onRoute) {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    if (e.detail.path) {
      history.pushState(null, null, e.detail.path);
      onRoute(window.location.pathname);
    }
  });

  window.addEventListener("popstate", () => {
    onRoute(window.location.pathname);
  });
}
export function push(path) {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, { detail: { path } })
  );
}
export function pushHistoryById(id) {
  const path = `/documents/${id}`;
  push(path);
}
