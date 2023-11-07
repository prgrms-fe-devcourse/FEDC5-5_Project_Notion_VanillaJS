import EditorApp from "./Editor/App.js";
import MenuBarApp from "./MenuBar/App.js";
import { HTTPRequest } from "./Util/Api.js";
import { getCustomEvent, movePage } from "./Util/Router.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  // state가 변경되면 App.js 하위 컴포넌트의 state도 변경
  this.setState = (nextState) => {
    this.state = nextState;
  };
  // 메뉴 바 컴포넌트
  const menuBarApp = new MenuBarApp({
    $target,
    initialState,
  });

  // 편집기 컴포넌트
  const editorApp = new EditorApp({
    $target,
    initialState,
  });

  // pathname에 따른 경로 하위 컴포넌트의 상태 변경
  const pathByRequestPostData = async (pathname, callMoment) => {
    // 루트 페이지
    if (pathname === "/") {
      const postList = await fetchPostData("");

      menuBarApp.setState(postList);
      editorApp.setState(null);
    } else {
      // 해당 id를 가진 문서를 에디터 App의 state에 전송
      const [_, id] = pathname.split("/");
      const [post, postList] = await Promise.all([
        fetchPostData(`/${id}`),
        fetchPostData(""),
      ]);

      // 렌더링 시기가 최초 렌더링인지 아닌지 검사 후 api 통신
      callMoment === "first" ? menuBarApp.setState(postList) : "";
      editorApp.setState(post);
    }
  };

  // 최초 렌더링
  const render = async () => {
    const { pathname } = window.location;

    pathByRequestPostData(pathname, "first");
  };

  // 변경된 pathname을 렌더링
  const route = async () => {
    const { pathname } = window.location;

    pathByRequestPostData(pathname, "after");
  };

  // document 리스트 get 요청
  const fetchPostData = async (url, payload = {}) => {
    const postList = await HTTPRequest(url, payload);

    return postList;
  };

  // 새로 고침 & 최초 실행시 라우팅
  render();

  // window의 이벤트 대기
  getCustomEvent(route);

  // 뒤로가기 라우팅
  movePage(route);
}
