import RootContainer from "./Root/RootContainer.js";
import DocumentContainer from "./Document/DocumentContainer.js";
import { request } from "../library/api.js";
import { initRouter, push } from "../library/router.js";
import { getChangedTitle } from "../library/titleChanger.js";

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

  //fetchRoot로 rootContainer를 렌더해줍니다.
  const fetchRoot = async () => {
    const roots = await request(`/documents`);
    this.setState(roots);
  };

  //게시글 제목이 바뀌는 경우 Root Render
  getChangedTitle(() => {
    fetchRoot();
  });

  const rootContainer = new RootContainer({
    $target,
    initialState,
    onRenderDoc: async (documentId) => {
      await documentContainer.fetchDoc(documentId);
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
  });

  this.render = async () => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      fetchRoot();
      documentContainer.init();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , docId] = pathname.split("/");
      await fetchRoot();
      await documentContainer.fetchDoc(docId);
    }
  };

  this.render();

  initRouter(() => {
    this.render();
  });

  window.addEventListener("popstate", (e) => {
    const { pathname } = e.target.location;
    console.log("pop", pathname);
    const [, , docId] = pathname.split("/");
    fetchRoot();
    documentContainer.fetchDoc(docId);
  });
}
