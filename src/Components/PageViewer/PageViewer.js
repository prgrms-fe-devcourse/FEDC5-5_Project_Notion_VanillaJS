import IndexPage from "../../Page/IndexPage.js";
import Editor from "./Editor/Editor.js";
import SubPage from "./SubPageList/SubPage.js";

const TOGGLE_CLASS_NAME = "view";

export default function PageViewer({ target, state, onEditing }) {
  /* PageViewer */
  const pageViewerElement = document.createElement("article");
  pageViewerElement.setAttribute("class", "pageViewer");
  target.appendChild(pageViewerElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    const { id } = this.state;

    /* URL 이 Index Page */
    if (id === "Index") {
      indexPage.getElement().classList.add(TOGGLE_CLASS_NAME);
      editor.getElement().classList.remove(TOGGLE_CLASS_NAME);
      subPage.getElement().classList.remove(TOGGLE_CLASS_NAME);
      return;
    }

    /* URL 이 ID */
    indexPage.getElement().classList.remove(TOGGLE_CLASS_NAME);
    editor.getElement().classList.add(TOGGLE_CLASS_NAME);
    subPage.getElement().classList.add(TOGGLE_CLASS_NAME);

    editor.setState(this.state);
    subPage.setState(this.state);
  };

  const indexPage = new IndexPage({
    target: pageViewerElement,
  });

  /* Editor */
  const editor = new Editor({
    target: pageViewerElement,
    state: this.state,
    onEditing,
  });

  /* Current Page Child List */
  const subPage = new SubPage({
    target: pageViewerElement,
    state: this.state,
  });
}
