export const initRouter = (onRoute) => {
  //걍 initRouter안에 this.render넣으면 알아서 처리하고 this.render함
  window.addEventListener("route-change", (e) => {
    //이벤트가 발생되면 pushState발생
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, `/documents/${nextUrl}`);
      onRoute(); //pushState후 참조 함수를 실행하는데 App.js가보면 render가 들어있음
    }
  });
};

export const push = (docId) => {
  //push가 되면 이벤트가 발생
  // history.pushState(null, null, `/documents/${docId}`);
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        nextUrl: docId,
      },
    })
  );
};
