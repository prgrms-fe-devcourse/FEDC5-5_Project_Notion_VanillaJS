import { request } from "../utils/api.js";
import { setItem, removeItem, getItem } from "../utils/storage.js";
import Editor from "./Editor.js";

export default function ContentsPage({ $target, fetchDocument }) {
  const $page = document.createElement("div");
  $page.classList.add("contents_page");

  this.state = {};

  const DOCUMENT_TEMP_SAVE_KEY = "docu_save_in_local";
  let timer = null;
  const editor = new Editor({
    $target: $page,
    initialState: {},
    onEditing: (docu) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(DOCUMENT_TEMP_SAVE_KEY, {
          ...docu,
          updatedAt: new Date(),
        });

        await request(`/documents/${docu.id}`, {
          method: "PUT",
          body: JSON.stringify(getItem(DOCUMENT_TEMP_SAVE_KEY)),
        });
        removeItem(DOCUMENT_TEMP_SAVE_KEY);

        fetchDocument();
      }, 500);
    },
  });

  this.setState = async ({ documentsId }) => {
    if (documentsId) {
      const res = await request(`/documents/${documentsId}`);
      this.state = res;
      editor.setState(this.state);
      this.render();
    } else {
      $target.removeChild($page);
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
