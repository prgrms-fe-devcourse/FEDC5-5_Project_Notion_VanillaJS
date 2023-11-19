import { push } from "../../library/router.js";

export default function Title({ $page }) {
  const $titleContainer = document.createElement("div");
  $titleContainer.className = "title-container";
  $page.appendChild($titleContainer);

  // 좌측 상단 노션 이미지
  const $image = document.createElement("img");
  $titleContainer.appendChild($image);
  $image.src = "/img/notionTitle.JPG";
  $image.alt = "Notion Title";
  $image.className = "title-image";

  // 좌측 상단 제목
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

  //클릭 시 홈으로 이동
  $titleContainer.addEventListener("click", (e) => {
    push("");
  });

  this.render();
}
