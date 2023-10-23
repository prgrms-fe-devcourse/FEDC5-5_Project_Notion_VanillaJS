import Editor from "./Editor.js";
import { getItem, setItem } from "./storage.js";
import { request } from "./api.js";

export default function ({ $target, initialState }) {
  const $page = document.createElement("div");

  this.state = initialState;

  // key를 조합해서 사용
  // 다른 page로 이동 시, 이전 page의 수정 내용이 들어오는 것 방지
  const TEMP_POST_SAVE_KEY = `temp-post-${this.state.postId}`;

  const post = getItem(TEMP_POST_SAVE_KEY, { title: "", content: "" });

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
        setItem(TEMP_POST_SAVE_KEY, { ...post, tempSaveDate: new Date() });
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;
      await fetchPost();
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(this.state.post);
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
