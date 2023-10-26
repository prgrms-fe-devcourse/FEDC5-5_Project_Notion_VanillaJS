export default function DocumentUser({ $target }) {
  const $documentUser = document.createElement("div");
  $documentUser.classList.add("document-user");
  $target.appendChild($documentUser);

  this.render = () => {
    $documentUser.innerHTML = "🖥 Jihee's Notion";
  };

  this.render();
}
