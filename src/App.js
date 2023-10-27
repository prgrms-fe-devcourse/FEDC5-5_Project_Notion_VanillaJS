import DocumentBox from "./components/Documents/DocumentBox.js";
import EditorBox from "./components/Editor/EditorBox.js";
import { init } from "./utils/router.js";

export default function App({ $target }) {
  const documentBox = new DocumentBox({
    $target,
  });

  const editorBox = new EditorBox({
    $target,
    onChange: () => {
      documentBox.setState();
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    documentBox.setState();

    if (pathname === "/") editorBox.setState();
    else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      editorBox.setState({ id: documentId });
    }
  };

  this.route();

  init(this.route);
}
