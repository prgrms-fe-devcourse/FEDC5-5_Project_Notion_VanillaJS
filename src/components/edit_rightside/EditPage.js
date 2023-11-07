import Editor from "./Editor.js";
import LinkChildPost from "../link_rightside/LinkChildPost.js";
import { request } from "../../api/Api.js";

export default function EditPage({ $target, initialState, onNewTitle }) {
  // const $div = document.createElement("div");
  // $target.appendChild($div);

  this.getPostApi = async (id) => {
    const selectedData = await request(`/${id}`);
    const data = { ...selectedData, isRender: false };
    this.setState(data);
  };

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    // 라우터 통해 전달받은 id 값이 index라면
    if (this.state.id === "index") {
      // editor에도 id 전달
      editor.setState({ id: "index" });
      return;
    }
    editor.setState(nextState);
    linkChildPost.setState(nextState);
  };

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (id) => {
      // postlist도 리렌더 ( 편집기에서 수정한 제목이 side-bar에도 즉각적으로 반영 )
      onNewTitle(id);
    },
  });

  // 편집기 밑에 현재 선택된 post의 하위 post 링크
  const linkChildPost = new LinkChildPost({ $target, initialState });
}
