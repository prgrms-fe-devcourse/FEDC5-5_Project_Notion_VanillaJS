const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  // nextUrl이 유효할 때만 라우팅 처리
  // route가 매번 호출 되는 것을 방지
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  // custom 이벤트 발생
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      // 이벤트 데이터로 넣을 수 있는 값
      detail: {
        nextUrl,
      },
    })
  );
};
