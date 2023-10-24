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

      timer = setTimeout(() => {
        setItem(postLocalSaveKey, { ...post, tempSaveDate: new Date() });
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      // 새 글 작성 시 , temp-post-new에 저장하지 않도록 지정
      postLocalSaveKey = `temp-post-${this.state.postId}`;
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

      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
