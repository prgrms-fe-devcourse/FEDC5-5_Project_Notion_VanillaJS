import { push } from "../utils/router.js";

export default function MatchedDocument({ $target, initialState }) {
  const $link = document.createElement("section");
  $target.appendChild($link);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { matched, linkText } = this.state;
    $link.innerHTML = matched
      ? `<span class="existTitle">${linkText}</span> 제목이 존재합니다.`
      : "";
  };

  window.addEventListener("input-change", (e) => {
    const { id, title } = e.detail;
    this.setState({ matched: true, linkText: title });
    $link.addEventListener("click", (e) => {
      e.preventDefault();
      this.setState({ ...this.state, matched: false });
      push(id);
    });
  });
}
