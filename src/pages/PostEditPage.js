import Editor from "../components/Editor/Editor.js";

import { getItem, setItem, removeItem } from "../utils/storage.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "post-edit-page";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.id}`;
  let timer = null;

  const savedPost = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  const editor = new Editor({
    $target: $page,
    initialState: savedPost,
    onEditing: (post) => {
      setItem(postLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });

      const initId = this.state.id;

      // 디바운스 (편집기 입력을 마치고 1.5초 뒤 실행)
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
      }, 1500);
    },
  });

  this.setState = async (nextState) => {
    postLocalSaveKey = `temp-post-${nextState.id}`;
    this.state = nextState;

    const tempPost = getItem(postLocalSaveKey, { title: "", content: "" });

    // 작성중인 내용이 서버에 저장되지 않은 경우
    if (
      tempPost.tempSaveDate &&
      tempPost.tempSaveDate > this.state.post.updatedAt
    ) {
      if (confirm("작성중인 글이 있습니다. 불러오시겠습니까?")) {
        editor.setState({
          ...tempPost,
          originalContent: tempPost.content,
        });
        
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
        originalContent: this.state.post.content,
      });
    }

    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
