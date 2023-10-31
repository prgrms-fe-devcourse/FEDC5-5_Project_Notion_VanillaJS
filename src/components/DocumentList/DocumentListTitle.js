import { push } from "../../utils/router.js";

export default function DocumentListTitle({ $target }) {
  const $documentListTitle = document.createElement("div");
  $target.appendChild($documentListTitle);
  $documentListTitle.className = "document-list-title document-list-block";

  this.render = () => {
    $documentListTitle.innerHTML = `
      <img src="/src/icons/notion-logo.png" alt="logo" width="25"  />
      <span style="margin-left: 5px;">최희라의 Notion</span>
    `;
  };

  $documentListTitle.addEventListener("click", () => {
    push("/");
  });

  this.render();
}
