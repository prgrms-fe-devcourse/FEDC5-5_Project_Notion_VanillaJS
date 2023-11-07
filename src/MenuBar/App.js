import PostList from "./PostList.js";
import { setCustomEvent } from "../Util/Router.js";

// menuBar 폴더의 App
export default function App({ $target, initialState }) {
  const $menuBar = document.createElement("div");
  // 문서 리스트 최상위 DOM의 클래스 설정
  $menuBar.setAttribute("class", "menuBar");

  // 사이드 메뉴바 리사이징 하기 위한 div 엘리먼트
  const $resizeMenu = document.createElement("div");
  $resizeMenu.setAttribute("class", "resizeMenu");

  // Document 리스트 컴포넌트
  const postList = new PostList({
    $target: $menuBar,
    initialState,
    onRenderContents: (id) => {
      setCustomEvent(`/${id}`);
    },
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    postList.setState(this.state);
  };

  this.render = () => {
    $target.appendChild($menuBar);
    $target.appendChild($resizeMenu);
  };

  this.render();
}
