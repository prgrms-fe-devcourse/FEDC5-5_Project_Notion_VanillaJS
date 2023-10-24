import Editor from "./Editor.js";
import { getItem, setItem } from "./storage.js";
import { request } from "./api.js";

export default function ({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  // key를 조합해서 사용
  // 다른 page로 이동 시, 이전 page의 수정 내용이 들어오는 것 방지
  let postLocalSaveKey = `temp-post-${this.state.postId}`;

  const post = getItem(postLocalSaveKey, { title: "", content: "" });

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: post,
    onEditing: (post) => {
      // 입력간격이 1초가 넘었을 때, timer 작동
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, { ...post, tempSaveDate: new Date() });

        const isNew = this.state.postId === "new";
        if (isNew) {
          const createdPost = await request("/posts", {
            method: "POST",
            body: JSON.stringify(post), //this.state에는 postId만 있으므로, 변경
          });

          history.replaceState(null, null, `/posts/${createdPost.id}`); // 뒤로가기 시, new로 가지 않도록 지정
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      // 새 글 작성 시 , temp-post-new에 저장하지 않도록 지정
      postLocalSaveKey = `temp-post-${nextState.postId}`;
      console.log(this.state);
      this.state = nextState;
      await fetchPost();
      return;
    }

    this.state = nextState;
    this.render();

    // default 값 지정
    // /posts/new에서 title, content에 undefined 방지
    editor.setState(this.state.post || { title: "", content: "" });
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await request(`./posts/${postId}`);

      const tempPost = getItem(postLocalSaveKey, { title: "", content: "" });

      // tempSaveDate -> 저장한 시간
      // updated_at -> 마지막으로 업데이트 되었던 시간
      if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.setState({ ...this.state, post: tempPost });
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
