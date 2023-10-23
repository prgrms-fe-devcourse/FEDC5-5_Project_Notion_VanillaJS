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

  const fetchDoc = async (id) => {
    const doc = await request(`/documents/${id}`);
    return doc;
  };

  const fetchNewPost = async () => {
    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: "",
      }),
    });
    return res;
  };

  const rootContainer = new RootContainer({
    $target,
    initialState,
    onRenderDoc: async (documentId) => {
      documentContainer.fetchDoc(documentId);
    },
    onAddDoc: async () => {
      const res = await fetchNewPost(); //새 포스트 불러서 res받고
      await fetchRoot(); //루트를 새로 렌더링해주고
      const doc = await fetchDoc(res.id); //받은 res.id로 fetchDoc으로 다시 res받고
      documentContainer.setState(doc); //그 res(doc)으로 docContainer를 setState해줌
      push(res.id);

      //documentContainer.render();
    }, //Root에 새 문서추가해주면서 새 문서 작성 페이지로 이동해야대
    //됐는데 내용이 null로 나오네
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
