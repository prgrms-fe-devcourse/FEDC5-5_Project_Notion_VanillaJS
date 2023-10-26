import { request } from "../api.js";
import { setItem } from "../storage.js";
import { push } from "../router.js";
import DocumentUser from "./DocumentUser.js";
import DocumentList from "./DocumentList.js";

export default function DocumentPage({ $target }) {
  const $page = document.createElement("div");
  $page.classList.add("document-page");

  // DocumentUser 컴포넌트 렌더링
  new DocumentUser({ $target: $page });

  // DocumentList 컴포넌트 렌더링
  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    // postId로 DELETE 요청 후 GET으로 문서 데이터를 받아온다. /로 url 변경
    onDelete: async (postId) => {
      await request(`/documents/${postId}`, {
        method: "DELETE",
      });
      this.setState();
      push("/");
    },
    // localStorage에 부모문서의 id를 저장하고, /documents/new로 url 변경
    onPost: (postId) => {
      setItem("parentId", postId);
      push("/documents/new");
    },
  });

  // 문서 데이터를 GET 후 문서 목록 렌더링
  this.setState = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
