export const initRouter = (onRoute) => {
  window.addEventListener("route-change", (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, `/documents/${nextUrl}`);
      onRoute();
    } else {
      history.pushState(null, null, `/`);
      onRoute();
    }
  });
};

export const push = (docId) => {
  //push가 되면 이벤트가 발생
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        nextUrl: docId,
      },
    })
  );
};
