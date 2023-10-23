import Editor from "./Editor.js";
import { request } from "../../library/api.js";

export default function DocumentContainer({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "DocumentContainer";
  $target.appendChild($page);
  $page.innerHTML = "DocumentContainer";
  this.state = initialState;

  const EditDoc = async (document) => {
    const res = await request(`/documents/${document.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: `${document.title}`,
        content: `${document.content}`,
      }),
    });
  };

  const $editor = new Editor({
    $page,
    initialState,
    onEdit: (nextState) => {
      EditDoc(nextState);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.setState(nextState);
    $editor.render();
  };
}
