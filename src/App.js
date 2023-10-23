import RootContainer from "./Root/RootContainer.js";
import DocumentContainer from "./Document/DocumentContainer.js";
import { request } from "../library/api.js";
import { initRouter, push } from "../library/router.js";

export default function App({ $app }) {
  const $target = document.createElement("div");
  $target.id = "target";

  $app.appendChild($target);
  const initialState = {};
  this.state = this.state;

  this.setState = (nextState) => {
    this.state = nextState;
    rootContainer.setState(this.state);
  };

  //이 fetch들은 this.state로 해서 아래로 각자 넘겨줍시다.
  const fetchRoot = async () => {
    const roots = await request(`/documents`);
    this.setState(roots);
  };

  const rootContainer = new RootContainer({
    $target,
    initialState,
    onRenderDoc: async (documentId) => {
      documentContainer.fetchDoc(documentId);
    },
  });

  const documentContainer = new DocumentContainer({
    $target,
    initialState: {
      id: null,
      title: null,
      content: "",
      documents: [],
      createAt: null,
      updatedAt: null,
    },
    onEdit: (document) => {
      console.log("온에딧", document);
      EditDoc(document);
    },
  });

  this.render = () => {
    const pathname = window.location.pathname;
    console.log("여기는 패스네임", pathname);
    if (pathname === "/") {
      fetchRoot();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , docId] = pathname.split("/");
      console.log(docId);
      fetchRoot();
      documentContainer.fetchDoc(docId);
    }
  };

  this.render(); //맨 처음 렌더링

  initRouter(() => {
    //
    this.render();
  });
}
