import App from "./components/App.js";

import { getData, getDatas, getIDs } from "./utils/fetchData.js";

import {
  deleteDocuments,
  deleteEmptyStringDocuments,
} from "./utils/fetchData.js";

const initialSideBarState = await getDatas();
const initialId = getIDs(initialSideBarState)[0];
let initialEditorState = { id: -1, title: "", content: "" };
if (initialId && initialId.length > 0) {
  initialEditorState = await getData(initialId);
}

const $target = document.querySelector("#app");
new App({ $target, initialSideBarState, initialEditorState });
