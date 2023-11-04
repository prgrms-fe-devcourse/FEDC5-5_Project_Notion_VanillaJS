import Editor from "./Editor.js";
import SubPages from "./SubPages.js";
import { request } from "./utils/api.js";
import { localStorageGetItem, localStorageSetItem } from "./utils/storage.js";

export default function EditPage({ $target, initialState }) {
  // $wrapEditPage , 초기디폴트는 {docId: "new",  doc: {  title: "",  content: "",}, }
  const $editPage = document.createElement("div");
  $editPage.className = "edit_page";

  this.state = initialState;

  let DOC_TMP_KEY = `doc_tmp_${this.state.docId}`;
  let timerPost = null;

  const editor = new Editor({
    $target: $editPage,
    initialState: { title: "", content: "" },
    onEditing: async (nextState, type = "") => {
      clearTimeout(timerPost);

      if (type === "title") {
        //<< 제목의 경우 디바운스 없이 PUT
        await request(`/documents/${nextState.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: nextState.title,
            content: nextState.content,
          }),
        });
      } else {
        // << content는 2초 디바운스
        timerPost = setTimeout(async () => {
          await request(`/documents/${nextState.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: nextState.title,
              content: nextState.content,
            }),
          });
        }, 2000);
      }
    },
  });

  const subPages = new SubPages({
    $target: $editPage,
    initialState: [],
  });

  this.setState = async ({ docId }) => {
    this.state = docId;
    DOC_TMP_KEY = `doc_tmp_${docId}`;

    const res = await request(`/documents/${docId}`);

    editor.setState(res);
    subPages.setState(res.documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($editPage);
  };
}
