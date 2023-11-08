import DocumentEditor from "../Pages/DocumentEditor.js";
import EditorFooterBar from "../Pages/EditorFooterBar.js";
import { request } from "../api/api.js";

export default function DocumentEditComponent({
  $target,
  initialState,
  onRefresh,
}) {
  const $page = document.createElement("div");

  this.state = initialState;

  $target.appendChild($page);

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      //1. 먼저 받아온 아이디를 상태에 저장
      this.state = nextState;
      //2. API요청
      await fetchDocument();
      return;
    }

    //3. API요청에서 setState다시실행
    //4. 현재 nextState에는 API에서 받아온 document가 있음
    if (
      this.state.id === nextState.id &&
      this.state.document &&
      this.state.documentList
    ) {
      //이 조건은 현재 뒤로 갔다 왔는데 this.state에는 데이터가 있으니까 바로 하위 컴포넌트 렌더링
      documentEditor.setState({
        id: this.state.document.id || "",
        title: this.state.document.title || "",
        content: this.state.document.content || "",
        documentList: this.state.documentList,
      });
      editorFooterBar.setState({ document: this.state.document || "" });
    } else {
      //이 조건은 API요청 후에 this.state에 nextState를 넣어줘야하기 때문에 넣어주고 하위컴포넌트 렌더링
      this.state = nextState;

      editorFooterBar.setState({ document: this.state.document });
      documentEditor.setState({
        id: this.state.document.id || "",
        title: this.state.document.title || "",
        content: this.state.document.content || "",
        documentList: this.state.documentList,
      });
    }
  };

  let timer = null;

  const documentEditor = new DocumentEditor({
    $target: $page,
    initialState: { id: "", title: "", content: "", documentList: [] },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await request(`/documents/${document.id}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });
        onRefresh();
      }, 1000);
    },
  });

  const editorFooterBar = new EditorFooterBar({
    $target: $target,
    initialState: {
      document: [],
      totalHeigth: 0,
    },
  });

  const fetchDocument = async () => {
    const { id } = this.state;

    if (id) {
      const lists = await request("/documents");
      const document = await request(`/documents/${id}`);
      this.setState({
        ...this.state,
        document,
        documentList: lists,
      });
    }
  };
}
