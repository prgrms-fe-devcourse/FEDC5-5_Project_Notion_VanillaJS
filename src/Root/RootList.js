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
    return `<div class="li-container">
    <li data-id=${
      document.id
    } class="rootList"><div class="arrow">&#10095</div> <div class="li-content">
      ${
        document.title.length > 8
          ? `${document.title.slice(0, 8)}...`
          : document.title
      }</div>
      <button class="addSibling">+</button>
    </li>
    ${
      document.documents.length !== 0
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
  //null에 addEvent막기 위해 page아래에서 타겟 찾음
  $root.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $button = e.target.closest("button");

    //li를 클릭시 문서로 이동
    if ($li) {
      const { id } = $li.dataset;
      const $arrow = $li.querySelector(".arrow");
      $li.classList.toggle("opened");
      if (e.target.className !== "addSibling") {
        //추가버튼 말고
        onClick(id);
      }
    }
    //button클릭시 새 문서 혹은 하위문서 추가
    if ($button) {
      if ($button.className === "addParent") {
        addNewDoc();
      } else {
        const { id } = $li.dataset;
        addSibling(id);
        e.stopPropagation();
      }
    }
  });
}
