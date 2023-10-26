import SideBar from "./SideBar.js";
import PostEdit from "./PostEdit.js";
import Header from "./Header.js";

import { InitRouter } from "../utils/router.js";

import { updateEditingPostToSideBar } from "../utils/dataManager.js";
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
    setPostIdState: (id) => {
      const nextState = { id };
      editor.setState(nextState);
    },
  });

  const editor = new PostEdit({
    $target: $main,
    initalState: initialEditorState,
    setSideBarState: (editingPostData) => {
      const nextState = updateEditingPostToSideBar(
        sideBar.state,
        editingPostData
      );
      sideBar.setState(nextState);
    },
  });

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
}
