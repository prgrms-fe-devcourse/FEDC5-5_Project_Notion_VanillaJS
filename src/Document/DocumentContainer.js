import Editor from "./Editor.js";
import { request } from "../../library/api.js";
import { push } from "../../library/router.js";
import RemoveButton from "./RemoveButton.js";

export default function DocumentContainer({ $target, initialState, EditDoc }) {
  const $page = document.createElement("div");
  this.init = () => {
    $page.className = "DocumentContainer";
    $target.appendChild($page);
    $page.innerHTML = "DocumentContainer";
    this.state = initialState;
  };
  this.init();

  this.fetchDoc = async (id) => {
    const doc = await request(`/documents/${id}`);
    if (this.state.id === doc.id) {
      //무한루프 방어코드
      return;
    }
    if (doc.title === "제목없음") {
      doc.content = "";
    }
    this.setState(doc);
    //console.log("fechDoc", doc);
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

    $editor.setState(this.state);
    $editor.render();
    $button.setState(this.state);
  };

  const $button = new RemoveButton({ $page, initialState });
}
