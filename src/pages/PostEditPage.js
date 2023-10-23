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
    onEditing: async (post) => {
      // 디바운스 적용 (추후 함수로 따로 뺄 것)
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        await request(`/documents/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
        });

        if (post !== this.state.post) {
          push(`/documents/${this.state.id}`);
        }

        this.setState({
          ...this.state,
          post,
        });

        removeItem(postLocalSaveKey);
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      postLocalSaveKey = `temp-post-${nextState.id}`;
      this.state = nextState;

      if (this.state.id === "new") {
        const savedPost = getItem(postLocalSaveKey, {
          title: "제목 없음",
          content: "",
        });
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
        title: "제목 없음",
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
