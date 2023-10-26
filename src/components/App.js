import SideBar from "./SideBar.js";
import PostEdit from "./PostEdit.js";
import Header from "./Header.js";

import { InitRouter } from "../utils/router.js";
import { updatePostToSideBar } from "../utils/dataManager.js";
import { push } from "../utils/router.js";

// fetch 로 얻은 초기값을 App 컴포넌트에 전달합니다.
export default function App({
  $target,
  initialSideBarState,
  initialEditorState,
}) {
  const $main = document.createElement("main");
  $target.appendChild($main);

  new Header({ $target: $main, text: "Notion Clone Coding" });

  const sideBar = new SideBar({
    $target,
    initialState: initialSideBarState,
    // 콜백으로 editor 컴포넌트의 id 상태를 변경합니다.
    setPostIdState: (id) => {
      const nextState = { id };
      editor.setState(nextState);
    },
  });

  const editor = new PostEdit({
    $target: $main,
    initalState: initialEditorState,
    // 콜백으로 sideBar 컴포넌트의 상태를 변경합니다.
    setSideBarState: (editingPostData) => {
      const nextState = updatePostToSideBar(sideBar.state, editingPostData);
      sideBar.setState(nextState);
    },
  });

  // 라우터를 초기화합니다.
  this.route = (path) => {
    if (path === "/") {
      sideBar.setState(initialSideBarState);
    } else if (path.indexOf("/documents/") === 0) {
      const id = path.split("/")[2];
      editor.setState({ id });
    }
  };

  this.route(window.location.pathname);

  InitRouter(() => this.route(window.location.pathname));

  push(`/documents/${initialEditorState.id}`);
}
