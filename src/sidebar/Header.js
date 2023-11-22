import { CREATED_DOCUMENTS_PARENT_ID_KEY } from "../utils/key.js";
import { push } from "../utils/router.js";
import { getItem, removeItem } from "../utils/storage.js";
import { AddElements } from "./components/elements.js";

export default function Header({ $target, text }) {
  // root directory를 만드는 역할.
  const $header = document.createElement("header");
  const $title = document.createElement("div");
  const fragment = document.createDocumentFragment();

  fragment.appendChild($title);
  fragment.appendChild($header);
  $target.appendChild(fragment);

  this.render = () => {
    $header.innerHTML = `
            <span class='Title'>Notion</span>
            <h4>${text}</h4>
            ${AddElements({ id: "root" })}
        `;
  };

  this.render();

  $header.addEventListener("click", (e) => {
    const { target } = e;
    const isExist = getItem(CREATED_DOCUMENTS_PARENT_ID_KEY, null);

    if (target.classList.contains("add") && isExist) {
      push(`/documents/new`);
    }
  });
}
