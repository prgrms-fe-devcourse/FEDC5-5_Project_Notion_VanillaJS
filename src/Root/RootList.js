export default function RootList({
  $page,
  initialState,
  onClick,
  addNewDoc,
  addSibling,
}) {
  const $root = document.createElement("div");
  $root.className = "root";
  $page.appendChild($root);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  function renderDocument(document) {
    const hasChildren = document.documents.length > 0;
    return `<div class="li-container">
      <li data-id=${document.id} class="rootList ${
      //하위 documents가 있다면 has-children클래스를 추가"
      hasChildren ? "has-children" : ""
    }">
      ${
        //하위 documents가 있다면 토글을 위한 화살표 표시
        hasChildren ? `<div class="li-arrow arrow-opened">&#10095</div>` : ""
      } 
      <div class="li-title">
        ${
          //제목이 길면 짤라줌
          document.title.length > 8
            ? `${document.title.slice(0, 8)}...`
            : document.title
        }</div>
        <button class="addSibling">+</button>
      </li>
      ${
        //하위 documents가 있다면 재귀적으로 renerDocument함수 다시 호출
        hasChildren
          ? `<ul>${document.documents
              .map((v) => renderDocument(v))
              .join("")}</ul>`
          : ""
      }
      </div>`;
  }

  this.render = () => {
    $root.innerHTML = `
          <div class="document_tree">
          <p class="top-root">개인 페이지 <button class="addParent">+</button></p>
              <ul>
              ${this.state.map((v) => renderDocument(v)).join("")}
              </ul>
          </div>
          `;
  };

  $root.addEventListener("click", (e) => {
    //li, 버튼, 화살표, li의 title,
    const $li = e.target.closest("li");
    const $button = e.target.closest("button");
    const $arrow = e.target.closest(".li-arrow");
    const $title = e.target.closest(".li-title");
    const $liContainer = e.target.closest(".li-container");

    if ($arrow) {
      //화살표 클릭 시 open className추가
      $liContainer.classList.toggle("content-opened");
      $arrow.classList.toggle("arrow-opened");
    } else if ($title) {
      //liContent클릭 시 해당 li로 화면 렌더링
      const { id } = $li.dataset;
      onClick(id);
    } else if ($button) {
      //button클릭시 새 문서 혹은 하위문서 추가
      if ($button.className === "addParent") {
        addNewDoc();
      } else {
        const { id } = $li.dataset;
        addSibling(id);
        e.stopPropagation();
      }
    } else if ($liContainer) {
      //컨테이너 클릭 시 아무일도 안일어나도록.
      return;
    }

    if ($liContainer.classList.contains("content-opened")) {
      //liContainer의 opened클래스 여부 따라서 하위  doc 렌더 여부 결정
      const $ul = $liContainer.querySelector("ul"); //하위 docs ul
      console.log($ul);
      $ul.style.display = "none";
    } else {
      const $ul = $liContainer.querySelector("ul"); //하위 docs ul
      $ul.style.display = "block";
    }
  });
}
