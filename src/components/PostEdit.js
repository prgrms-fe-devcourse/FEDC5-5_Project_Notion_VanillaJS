import Editor from "./Editor.js";
import Footer from "./Footer.js";
import { getData, putData } from "../utils/fetchData.js";
import {
  isDataInLocalStorage,
  getEditingPostData,
  removeEditingPostData,
} from "../utils/storage.js";

export default function PostEdit({ $target, initialState, setSideBarState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const localData = getEditingPostData(this.state.id);

    getData(this.state.id).then((data) => {
      footer.setState(data.documents);

      console.log(localData.tempUpdatedAt, data.updatedAt);
      if (localData.tempUpdatedAt > data.updatedAt) {
        const isConfirmed = confirm(
          "저장되지 않은 데이터가 있습니다. 불러오시겠습니까?"
        );
        putData(this.state.id, localData).then(() => {
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
  const editor = new Editor({
    $target: $div,
    initialState: this.state,
    setSideBarState,
  });

  const footer = new Footer({
    $target: document.querySelector("#app"),
    initialState: [],
  });
}
