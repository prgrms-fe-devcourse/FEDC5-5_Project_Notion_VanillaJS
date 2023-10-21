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

  const savedPost = getItem(postLocalSaveKey, { title: "", content: "" });
  const editor = new Editor({
    $target: $page,
    initialState: savedPost,
    onEditing: async (post) => {
      // 디바운스 적용 (추후 함수로 따로 뺄 것)
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.id === "new";

        // 새 문서를 작성하는 경우
        if (isNew) {
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify(post),
          });
          // history.replaceState(null, null, `/documents/${createdPost.id}`);
          push(`/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            ...this.state,
            id: createdPost.id,
          });
        } else {
          // 이미 존재하는 문서인 경우
          await request(`/documents/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      postLocalSaveKey = `temp-post-${nextState.id}`;
      this.state = nextState;

      if (this.state.id === "new") {
        const savedPost = getItem(postLocalSaveKey, { title: "", content: "" });
        this.render();
        editor.setState(savedPost);
      } else {
        await fetchPost();
      }

      return;
    }

    this.state = nextState;
    this.render();
    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { id } = this.state;

    if (id !== "new") {
      const post = await request(`/documents/${id}`);
      const tempPost = getItem(postLocalSaveKey, { title: "", content: "" });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm("저장되지 않은 데이터가 있습니다. 불러오겠습니까?")) {
          this.setState({
            ...this.state,
            post: tempPost,
          });
          return;
        }
      }
      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
