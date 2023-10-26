import { fetchGet } from "../../utils/api.js";
import Editor from "./Editor.js";
import { getItem, setItem, removeItem } from "../../utils/storage.js";
import { validateConstructorUsage } from "../../utils/validation.js";
import { CLASS_NAME, MESSAGE } from "../../utils/constants.js";

export default function DocumentEditorpage({ $target, initialState, onEdit }) {
  validateConstructorUsage(new.target);

  const $page = document.createElement("div");
  $page.className = CLASS_NAME.DOCUMENT_EDITOR;

  $target.appendChild($page);

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.documentId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  this.setState = (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = { ...this.state, ...nextState };
      postLocalSaveKey = `temp-post-${this.state.documentId}`;
      this.render();
    }
  };

  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEdit,
  });

  this.render = async () => {
    if (this.state.documentId === "new") {
    } else if (this.state.documentId !== null) {
      const post = await fetchGet(`/documents/${this.state.documentId}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updatedAt) {
        if (confirm(MESSAGE.CONFIRM_TEMPDATA)) {
          editor.setState({
            id: this.state.documentId,
            title: tempPost.title,
            content: tempPost.content,
          });
          return;
        }
      }

      editor.setState({
        id: this.state.documentId,
        title: post.title,
        content: post.content,
      });
    }
  };

  this.render();
}
