import Editor from "./Editor.js";
import Footer from "./Footer.js";

import { getData, putData } from "../utils/fetchData.js";
import { getEditingPostData, removeEditingPostData } from "../utils/storage.js";

// editor 로 가기전 스토리지 데이터와 서버 데이터를 비교하여
// 스토리지 데이터가 더 최신이면 서버 데이터를 덮어씌웁니다.
export default function PostEdit({ $target, initialState, setSideBarState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    // 로컬 스토리지 데이터를 가져옵니다.
    const localData = getEditingPostData(this.state.id);

    // 서버 데이터를 가져옵니다.
    getData(this.state.id).then((data) => {
      footer.setState(data.documents);

      // 로컬 스토리지 데이터가 서버 데이터보다 최신이면
      if (localData.tempUpdatedAt > data.updatedAt) {
        const isConfirmed = confirm(
          "저장되지 않은 데이터가 있습니다. 불러오시겠습니까?"
        );
        putData(this.state.id, localData).then(() => {
          // 서버에 데이터를 덮어씌웁니다.
          editor.setState(isConfirmed ? localData : data);
          setSideBarState(isConfirmed ? localData : data);
          removeEditingPostData(this.state.id);
        });
      } else {
        editor.setState(data);
        setSideBarState(data);
      }
    });
  };

  const $div = document.createElement("div");
  $target.appendChild($div);
  $div.id = "editorView";

  // editor 컴포넌트를 생성합니다.
  const editor = new Editor({
    $target: $div,
    initialState: this.state,
    setSideBarState,
  });

  // footer 컴포넌트를 생성합니다.
  const footer = new Footer({
    $target: document.querySelector("main"),
    initialState: [],
  });
}
