import Editor from "../components/Editor.js";

import { getItem, setItem, removeItem } from "../utils/storage.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "post-edit";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.id}`;
  let timer = null;

  const savedPost = getItem(postLocalSaveKey, {
    title: "제목 없음",
    content: "",
  });

  const editor = new Editor({
    $target: $page,
    initialState: savedPost,
    onEditing: (post) => {
      // 디바운스 적용 (추후 함수로 따로 뺄 것)
      setItem(postLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });

      const initId = this.state.id;

      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        // setTimeout 콜백 함수가 실행되기 전후로 id가 같은지 검사
        if (initId !== this.state.id) {
          return;
        }

        await request(`/documents/${this.state.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
        });

        if (post !== this.state.post) {
          push(`/documents/${this.state.id}`);
        }

        removeItem(postLocalSaveKey);
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    postLocalSaveKey = `temp-post-${nextState.id}`;
    this.state = nextState;

    editor.setState({
      title: this.state.post.title,
      content: this.state.post.content,
    });

    const tempPost = getItem(postLocalSaveKey, { title: "", content: "" });
    if (
      tempPost.tempSaveDate &&
      tempPost.tempSaveDate > this.state.post.updatedAt
    ) {
      if (confirm("작성중인 글이 있습니다. 불러오시겠습니까?")) {
        editor.setState(tempPost);
        await request(`/documents/${this.state.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...this.state,
            title: tempPost.title,
            content: tempPost.content,
          }),
        });

        if (tempPost !== this.state.post) {
          push(`/documents/${this.state.id}`);
        }
      } else {
        removeItem(postLocalSaveKey);
      }
    } else {
      editor.setState({
        title: this.state.post.title,
        content: this.state.post.content,
      });
    }

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
