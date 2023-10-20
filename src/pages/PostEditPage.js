import Editor from "../components/Editor.js";

import { getItem, setItem, removeItem } from "../utils/storage.js";
import { request } from "../utils/api.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "post-edit"

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.id}`;

  const savedPost = getItem(postLocalSaveKey, { title: "", content: "" });

  const editor = new Editor({
    $target: $page,
    initialState: savedPost,
    onEditing: (post) => {
      let timer;
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.id === "new";

        if (isNew) {
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify(post),
          });
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);

          this.setState({
            ...this.state,
            id: createdPost.id,
          });
        } else {
          await request(`/documents/${post.id}`, {
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
