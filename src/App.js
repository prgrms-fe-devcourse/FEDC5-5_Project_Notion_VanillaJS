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
    console.log("app.this.state", this.state);
    rootContainer.setState(this.state);
  };

  //root에 뭐가 있는지 받아와서 setState해줌
  //app의 initialState 데이터 형식과 일치
  const fetchRoot = async () => {
    const roots = await request(`/documents`);
    this.setState(roots);
  };

  fetchRoot();

  const fetchDoc = async (id) => {
    const doc = await request(`/documents/${id}`);
    return doc;
  };

  const rootContainer = new RootContainer({
    $target,
    initialState,
    onClick: async (documentId) => {
      const doc = await fetchDoc(documentId);
      documentContainer.setState(doc);
      documentContainer.render();
    },
    addNewDoc: async () => {
      console.log("addneDoc시작");
      const res = await fetchNewPost();
      //{ res형식
      // "id": 6,
      // "title": "문서 제목",
      // "createdAt": "생성된 날짜",
      // "updatedAt": "수정된 날짜"
      //}
      //이 res를 root에 추가해줘
      await fetchRoot(); //루트는 새로 렌더링해주고
      //이제 fetchDoc해줘야지.
      console.log(res); //res에 대해 출력됐고
      const doc = await fetchDoc(res.id);
      documentContainer.setState(doc);
      documentContainer.render();
    }, //Root에 새 문서추가해주면서 새 문서 작성 페이지로 이동해야대
    //됐는데 내용이 null로 나오네
  });

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

  const EditDoc = async (document) => {
    const res = await request(`/documents/${document.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: `${document.title}`,
        content: `${document.content}`,
      }),
    });
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
    onEdit: (document) => {
      console.log("온에딧", document);
      EditDoc(document);
    },
  });
}
