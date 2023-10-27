import { push } from "../../utils/router.js";

export default function PostListTitle({ $target }) {
  const $postListTitle = document.createElement("div");
  $target.appendChild($postListTitle);
  $postListTitle.className = "post-list-title post-list-block";

  this.render = () => {
    $postListTitle.innerHTML = `
      <img src="/src/icons/notion-logo.png" alt="logo" width="25"  />
      <span style="margin-left: 5px;">최희라의 Notion</span>
    `;
  };

  $postListTitle.addEventListener("click", () => {
    push("/");
  });

  this.render();
}
