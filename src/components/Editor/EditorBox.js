import EditorPage from "./EditorPage.js";
import { request } from "../../utils/request.js";
import { push } from "../../utils/router.js";

export default function EditorBox({ $target, onChange }) {
  const $editorBox = document.createElement("main");
  $editorBox.className = "editor-box";
  $target.appendChild($editorBox);

  let timer = null;
  this.state = {
    id: null,
  };

  const $editor = new EditorPage({
    $target: $editorBox,
    initialState: { title: "", content: "" },

    onEdit: ({ title, content }) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(async () => {
        if (this.state.id === "new") {
          const res = await request("/documents", {
            method: "POST",
            body: JSON.stringify({ title, parent: null }),
          });

          if (res) {
            this.state = res;
            push(`/documents/${this.state.id}`);
          } else {
            throw new Error("Post method 실패");
          }
        } else {
          await request(`/documents/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
          });

          onChange();
        }
      }, 800);
    },
  });

  this.setState = async (selectedDoc) => {
    const id = selectedDoc?.id;

    if (!id) {
      this.state = { id: "new" };
      $editor.setState({ title: "", content: "" });
    } else {
      this.state = selectedDoc;
      const doc = await request(`/documents/${id}`);
      $editor.setState(doc);
    }
  };
}
