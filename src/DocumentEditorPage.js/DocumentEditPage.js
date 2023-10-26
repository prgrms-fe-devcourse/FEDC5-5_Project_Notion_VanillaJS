import Editor from "./Editor.js";
import Footer from "./Footer.js";
import { request } from "../api.js";
import { getItem, removeItem, setItem } from "../storage.js";

export default function DocumentEditPage({
  $target,
  initialState,
  onListChange,
}) {
  const $page = document.createElement("div");
  $page.classList.add("document-edit-page");

  this.state = initialState;

  // localStorage에 저장할 key
  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, {
    title: "",
    content: "",
  });

  // 디바운스 사용
  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: post,
    // 편집기 편집 시
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer); // 2초
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.postId === "new";

        // 새로 생성된 문서라면 -> post 생성
        if (isNew) {
          // localStorage에서 부모 문서의 id를 가져옴. 없으면 null
          const parentId = getItem("parentId", null);
          // 부모 문서의 하위에 문서 생성. 부모 문서가 없다면 루트에 문서 생성
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify({ ...post, parent: parentId }),
          });
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);
          setItem("parentId", null);
          this.setState({ postId: createdPost.id });
        } else {
          // 기존에 있던 문서라면 -> post 수정
          await request(`/documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
        onListChange(); // 문서 목록을 다시 렌더링 (수정된 문서 제목이 문서 목록에 반영되도록)
      }, 2000);
    },
  });

  const footer = new Footer({
    $target: $page,
    initialState: this.state.postId,
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      this.state = nextState;

      if (this.state.postId === "new") {
        const post = getItem(postLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(post);
        footer.setState(post);
      } else {
        await fetchPost();
      }
      return;
    }

    if (this.state.postId === nextState.postId && this.state.post) {
      this.render();
      editor.setState(this.state.post || { title: "", content: "" });
    } else {
      this.state = nextState;
      footer.setState(this.state);
      this.render();
      editor.setState(this.state.post || { title: "", content: "" });
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (this.state.postId !== "new") {
      const post = await request(`/documents/${postId}`);

      const tempPost = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });

      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm("저장되지 않은 데이터가 있습니다. 불러올까요?")) {
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
