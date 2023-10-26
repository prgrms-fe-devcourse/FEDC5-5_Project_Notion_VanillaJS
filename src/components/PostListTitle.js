export default function PostListTitle({ $target }) {
  const $postListTitle = document.createElement("div");
  $target.appendChild($postListTitle);
  $postListTitle.className = "post-list-title post-list-block";

  this.render = () => {
    $postListTitle.textContent = `최희라의 Notion`;
  };

  this.render();
}
