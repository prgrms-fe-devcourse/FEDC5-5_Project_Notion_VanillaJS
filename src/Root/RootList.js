export default function RootList({
  $page,
  initialState,
  onClick,
  addNewDoc,
  addSubDoc,
  deleteDoc,
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
        hasChildren
          ? `<img src="../../img/keyboard-arrow-right.svg"  class="li-arrow arrow-opened">`
          : ""
      } 
      <div class="li-title">
        ${
          //제목이 길면 잘라줌
          document.title.length > 12
            ? `${document.title.slice(0, 12)}...`
            : document.title
        }</div>
        <img src="../../img/delete.svg" class="deleteButton">
        <img src="../../img/add.svg" class="addSubDoc">
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

  //this.render 내부에서 renderDocument 실행
  this.render = () => {
    $root.innerHTML = `
          <div class="document_tree">
          <p class="top-root">개인 페이지 <img src="../../img/add.svg" class="addParent"></p>
              <ul>
              ${this.state.map((v) => renderDocument(v)).join("")}
              </ul>
          </div>
          `;
  };

  $root.addEventListener("click", (e) => {
    //root 내부의 요소들 클릭 시 요소 별 액션 분할
    const $li = e.target.closest("li");
    const $button = e.target.closest("img");
    const $arrow = e.target.closest(".li-arrow");
    const $title = e.target.closest(".li-title");
    const $liContainer = e.target.closest(".li-container");

    if ($arrow) {
      //화살표 클릭 시 open className추가
      $liContainer.classList.toggle("content-opened");
      $arrow.classList.toggle("arrow-opened");
    } else if ($title) {
      //글 제목 클릭 시 해당 글로 화면 렌더링
      const { id } = $li.dataset;
      onClick(id);
    } else if ($button) {
      //button 클래그 별로 클릭시 새 문서 혹은 하위문서 추가 및 삭제
      if ($button.className === "addParent") {
        addNewDoc();
        return;
      } else if ($button.className === "addSubDoc") {
        const { id } = $li.dataset;
        addSubDoc(id);
        e.stopPropagation();
      } else {
        const { id } = $li.dataset;
        deleteDoc(id);
      }
    } else {
      //컨테이너 클릭 시 아무일도 안일어나도록.
      return;
    }

    const $ul = $liContainer.querySelector("ul"); // 하위 documents를 나타내는 ul
    if ($ul) {
      // 하위 문서의 화면 표시 여부 결정
      $ul.style.display = $liContainer.classList.contains("content-opened")
        ? "none"
        : "block";
    }
  });
}
