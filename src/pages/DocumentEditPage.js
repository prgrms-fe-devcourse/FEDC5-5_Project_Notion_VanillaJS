import LinkedDocumentList from "../components/Document/LinkedDocumentList.js";
import Editor from "../components/Editor/Editor.js";
import { CSS_SELECTOR } from "../components/Editor/cssSelector.js";
import { TAG } from "../constants/tag.js";
import { getDocument, updateDocument } from "../service/documents.js";
import { debounce } from "../utils/debounce.js";
import { createCustomElement } from "../utils/dom.js";
import { notionStorage } from "../utils/localStorage.js";

export default function DocumentEditPage({ $target, updateAllDocuments }) {
  const initialState = { title: "", content: "" };
  this.state = initialState;

  const document = notionStorage.getItem();

  const handleEditing = debounce(async (document) => {
    notionStorage.setItem({ ...document });

    await updateDocument(document);
    updateAllDocuments();

    notionStorage.removeItem();
  });

  const $editPage = createCustomElement({
    tag: TAG.SECTION,
    props: { id: CSS_SELECTOR.EDIT.SECTION },
  });

  const $editor = new Editor({
    $target: $editPage,
    state: document,
    onEditing: handleEditing,
  });

  const $linkedDocumentList = new LinkedDocumentList({
    $target: $editPage,
    state: document.documents,
  });

  $target.appendChild($editPage);

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      const { id } = this.state;

      const documentData = await getDocument(id);
      this.setState({ ...documentData });
      return;
    }

    this.state = nextState;
    $editor.setState(this.state);
    $linkedDocumentList.setState(this.state.documents);

    $editPage.style.display = "block";
  };
}
