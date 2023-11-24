import { jsx, registerComponent, renderRoot } from "@seongbin9786/my-renderer";
import { DocumentAPI } from "./api/DocumentAPI.js";
import { App } from "./components/App.js";
import { Header } from "./components/Header.js";
import { Layout } from "./components/Layout.js";
import { DocumentListItem, Sidebar } from "./components/Sidebar.js";
import { Popup } from "./components/Popup/Popup.js";
import { Dropdown } from "./components/Dropdown/Dropdown.js";
import { Editor } from "./components/Editor/Editor.js";

// enableDebugModule("Parser");
// enableDebugModule("NodeParser");
// enableDebugModule("Renderer");
// enableDebugModule("VDOM");
// enableDebugModule("Popup");
// enableDebugModule("Dropdown");
// enableDebugModule("Editor/ShowPlaceholderOnEmptyBlock");

const api = new DocumentAPI("seongbin");

// TODO: 의존성 주입 방식 개선하기
window.api = api;

registerComponent("App", App);
registerComponent("Layout", Layout);
registerComponent("Header", Header);
registerComponent("Sidebar", Sidebar);
registerComponent("DocumentListItem", DocumentListItem);
registerComponent("Popup", Popup);
registerComponent("Dropdown", Dropdown);
registerComponent("Editor", Editor);

const $body = document.getElementsByTagName("body").item(0);

if (!$body) {
    throw new Error("<body>가 없습니다.");
}

renderRoot(jsx`<App />`, $body);
