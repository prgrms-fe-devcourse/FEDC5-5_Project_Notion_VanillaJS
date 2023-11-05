export default function IndexPage({ target }) {
  /* 짭! 션! */
  const indexPageElement = document.createElement("h1");
  indexPageElement.setAttribute("class", "pageViewer_indexPage");
  indexPageElement.innerHTML = `
<div class="emptyBox"></div>
<div class="titleBox">
<h1 class="titleBox_title">Jae0's 짭션 🤔</h1>
<img src="/src/Img/notion_logo.svg" class="titleBox_img">
</div>
<div class="subTitle">사용 설명은 오른쪽 물음표 클릭! ➡️</div>
  `;

  target.appendChild(indexPageElement);

  this.getElement = () => {
    return indexPageElement;
  };
}
