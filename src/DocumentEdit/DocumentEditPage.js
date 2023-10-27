import Editor from "./Editor.js";
import { request } from "../utils/api.js";
import {ROUTE_DOCUMENTS, NEW} from "../utils/contants.js"

export default function DocumentEditPage({ $target, initialState, onEdit }) {
  this.state = initialState;
  const $page = document.createElement('div');
  $page.className = 'document-edit-page';
  /*
  initialState: {
    documentId: "",
    document: {
      title: "",
      content: "",
    },
  },
  */
  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  this.setState = async (nextState) => {
    if (this.state.documentId === nextState.documentId) {
      this.state = { ...this.state, ...nextState };
      editor.setState(
        this.state.document || {
          title: "",
          content: "",
        }
      );
      this.render();
      return;
    }
    this.state = { ...this.state, ...nextState };
    if (this.state.documentId === NEW) {
      editor.setState({
        title: "",
        content: "",
      });
      this.render();
    } else {
      await fetchDocument();
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;
    const document = await request(`${ROUTE_DOCUMENTS}/${documentId}`);
    if (!document) {
      alert("에러발생 없는 페이지 입니다");
      push("/");
      return;
    }
    this.setState({
      ...this.state,
      document,
    });
  };
}
