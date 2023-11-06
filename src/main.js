import App from "./components/App.js";

import { getDatas } from "./utils/fetchData.js";

// 최상위 레벨에서 async 사용
(async () => {
  const initialSideBarState = await getDatas();
  const initialId = initialSideBarState[0].id;

  const initialEditorState = { id: initialId };
  const $target = document.querySelector("#app");

  new App({ $target, initialSideBarState, initialEditorState });
})();
