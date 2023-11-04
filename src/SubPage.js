import { pushRoute } from "./utils/router.js";

export default function SubPage({ $target, initialState }) {
  const $subPage = document.createElement("div");
  $subPage.classList.add("sub_page");
  $target.appendChild($subPage);

  this.state = initialState;

  $subPage.innerHTML = this.state.title;

  $subPage.dataset.id = this.state.id;

  $subPage.addEventListener("click", (e) => {
    const { id } = e.target.dataset;
    pushRoute(`/docs/${id}`);
  });
}
