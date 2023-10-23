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

  //EditDoc은 RootTree도 변화시켜야 하기 때문에 최상위로 끌고옴
  const fetchEditingDoc = async (document) => {
    await request(`/documents/${document.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: `${document.title}`,
        content: `${document.content}`,
      }),
    });
    const res = await request(`/documents`);
    this.setState(res);
  };

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
    EditDoc: (document) => {
      fetchEditingDoc(document);
    },
  });

  this.render = () => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      fetchRoot();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , docId] = pathname.split("/");
      fetchRoot();
      documentContainer.fetchDoc(docId); //그러므로 router는 fetch를 실행함.
    }
  };

  this.render(); //맨 처음 렌더링

  initRouter(() => {
    //
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
