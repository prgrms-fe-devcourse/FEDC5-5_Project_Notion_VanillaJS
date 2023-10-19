import App from "./components/App.js";
import Header from "./components/Header.js";

import { getData, getDatas, getIDs } from "./utils/fetchData.js";

const initialSideBarState = await getDatas();
const initialId = getIDs(initialSideBarState);
let initialEditorState = { id: -1, title: "", content: "" };
if (initialId.length > 0) {
  initialEditorState = await getData(initialId);
}

const $target = document.querySelector("#app");

new Header({ $target, text: "Notion Clone Coding" });
new App({ $target, initialSideBarState, initialEditorState });
