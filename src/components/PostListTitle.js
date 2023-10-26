import { push } from "../utils/router.js";

export default function PostListTitle({ $target }) {
  const $postListTitle = document.createElement("div");
  $target.appendChild($postListTitle);
  $postListTitle.className = "post-list-title post-list-block";

  this.render = () => {
    $postListTitle.innerHTML = `최희라의 Notion`;
  };

  $postListTitle.addEventListener("click", () => {
    push("/");
  });

  this.render();
}
