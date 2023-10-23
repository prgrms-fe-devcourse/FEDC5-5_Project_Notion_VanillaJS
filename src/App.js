import RootContainer from "./Root/RootContainer.js";
import DocumentContainer from "./Document/DocumentContainer.js";
import { request } from "../library/api.js";

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

  //root에 뭐가 있는지 받아와서 setState해줌
  //app의 initialState 데이터 형식과 일치
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
  fetchRoot();

  const rootContainer = new RootContainer({
    $target,
    initialState,
    onRenderDoc: async (documentId) => {
      const doc = await fetchDoc(documentId); //doc정보 보내줘
      documentContainer.setState(doc);
      //documentContainer.render();
    },
    onAddDoc: async () => {
      const res = await fetchNewPost();
      await fetchRoot(); //루트는 새로 렌더링해주고
      const doc = await fetchDoc(res.id);
      documentContainer.setState(doc);
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
}
