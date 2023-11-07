const CHANGE_PAGE = "change-page";

// 설정한 커스텀 이벤트를 실행해 페이지 이동
export const getCustomEvent = (onRoute) => {
  window.addEventListener(CHANGE_PAGE, (e) => {
    const changeUrl = e.detail;

    if (changeUrl) {
      history.pushState(null, null, changeUrl);
      // 실행 할 경로의 페이지 렌더링
      onRoute();
    }
  });
};

// 이동할 페이지의 pathname 커스텀 이벤트로 설정
export const setCustomEvent = (changeUrl) => {
  window.dispatchEvent(
    new CustomEvent(CHANGE_PAGE, {
      detail: changeUrl,
    })
  );
};

// hitoryAPI
export const replaceState = (pathname) => {
  history.replaceState(null, null, pathname);
};

// 뒤로가기 시 pathname에 맞는 라우팅
export const movePage = (route) => {
  window.addEventListener("popstate", (e) => {
    route();
  });
};
