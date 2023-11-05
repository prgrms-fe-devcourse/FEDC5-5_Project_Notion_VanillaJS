import SavaDataConverter from "../../../Function/SavaDataConverter.js";
import EditContent from "./EditContent.js";
import EditInfo from "./EditInfo.js";
import EditTitle from "./EditTitle.js";

export default function Editor({ target, state, onEditing }) {
  const editorElement = document.createElement("div");
  editorElement.setAttribute("class", "pageViewer_editor");
  target.appendChild(editorElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    const { title, createdAt, updatedAt, content } = this.state;

    /* 각각 필요한 데이터 분배 */
    editTitlte.setState(title);
    editInfo.setState({ createdAt, updatedAt });
    editContent.setState(content);
  };

  /* Current Page Title Edit */
  const editTitlte = new EditTitle({
    target: editorElement,
    state: "",
  });

  /* Current Page created,updated date Info */
  const editInfo = new EditInfo({
    target: editorElement,
    state: {
      createdAt: "",
      updatedAt: "",
    },
  });

  /* Current Page Content Edit */
  const editContent = new EditContent({
    target: editorElement,
    state: "",
  });

  /* Event */
  editorElement.addEventListener("keyup", () => {
    const { id, createdAt, updatedAt, documents } = this.state;

    const titleValue =
      editorElement.querySelector("[data-name=title]").value ?? "";

    const contentValue =
      editorElement.querySelector("[data-name=content]").innerHTML ?? "";

    const newState = {
      id,
      title: titleValue,
      /* 저장 형식에 맞게 변환 */
      content: SavaDataConverter(contentValue),
      createdAt,
      updatedAt,
      documents,
    };
    onEditing(newState);
  });

  this.getElement = () => {
    return editorElement;
  };
}
