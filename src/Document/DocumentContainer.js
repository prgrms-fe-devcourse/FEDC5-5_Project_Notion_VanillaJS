import Editor from "./Editor.js";
import { request } from "../../library/api.js";
import { push } from "../../library/router.js";

export default function DocumentContainer({ $target, initialState }) {
  const $page = document.createElement("div");

  this.init = () => {
    $page.className = "DocumentContainer";
    $target.appendChild($page);
    $page.innerHTML = "DocumentContainer";
    this.state = initialState;
  };

  this.init(); //초기 화면

  //Document를 id받아서 request해서 setState해주는 함수
  this.fetchDoc = async (id) => {
    const doc = await request(`/documents/${id}`);
    if (this.state.id === doc.id) {
      //무한루프 방어코드 (순환참조 해결을 실패했습니다ㅠ)
      return;
    }
    if (doc.title === "제목없음") {
      doc.content = "";
    }
    this.setState(doc);
  };

  const $editor = new Editor({
    $page,
    initialState,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.setState(this.state);
    $editor.render();
  };
}
