import { push } from "../../library/router.js";

export default function Title({ $page }) {
  const $titleContainer = document.createElement("div");
  $titleContainer.className = "title-container";
  $page.appendChild($titleContainer);

  // Image Element
  const $image = document.createElement("img");
  $titleContainer.appendChild($image);
  $image.src = "/img/notionTitle.JPG";
  $image.alt = "Notion Title";
  $image.className = "title-image";

  // Title Element
  const $title = document.createElement("div");
  $titleContainer.appendChild($title);
  $title.className = "title";
  $title.innerHTML = "이재준의 Notion";

  this.render = () => {
    $titleContainer.appendChild($image);
    $image.src = "/img/notionTitle.JPG";
    $titleContainer.appendChild($title);
    $title.innerHTML = "이재준의 Notion";
  };

  $titleContainer.addEventListener("click", (e) => {
    push("");
  });

  this.render();
}
