export function pushHistoryById(id) {
  const path = `/documents/${id}`;
  window.history.pushState(null, null, path);
}
