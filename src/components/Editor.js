import api from "../api/api.js";
import { PUT_API_DOCUMENT } from "../api/url.js";

export default function Editor({
  $container,
  initialState = {},
  onSuccess,
  onAlert,
}) {
  const $document = document.createElement("div");
  $document.id = "document";
  $container.appendChild($document);

  this.state = initialState;
  let prevTitle;

  this.setState = (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      this.render();
      return;
    }
    prevTitle = this.state.title;
    this.state = nextState;
  };

  this.init = () => ($document.innerHTML = "");

  this.render = () => {
    $document.innerHTML = `
      <input type="text" name="title" value="${this.state.title}">
      <textarea name="content" placeholder="본문을 입력해주세요">${
        this.state.content ?? ""
      }</textarea>
    `;
  };

  let timer = null;
  $document.addEventListener("input", (e) => {
    const { name } = e.target;
    this.setState({
      ...this.state,
      [name]: e.target.value,
    });

    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(async () => {
      const { title, content } = this.state;
      if (!title) {
        onAlert();
        return;
      }
      await api.put(PUT_API_DOCUMENT(this.state.id), { title, content });
      onSuccess(this.state.id, title, prevTitle);
    }, 3000);
  });
}
