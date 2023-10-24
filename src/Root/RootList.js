export default function RootList({
  $page,
  initialState,
  onClick,
  addNewDoc,
  addSibling,
}) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  function renderDocument(document) {
    return `
    <li data-id=${document.id} class="rootList">
      ${
        document.title.length > 8
          ? `${document.title.slice(0, 8)}...`
          : document.title
      }
      <button class="addSibling">+</button>
    </li>
    ${
      document.documents.length !== 0
        ? `<ul>${document.documents
            .map((v) => renderDocument(v))
            .join("")}</ul>`
        : ""
    }
    `;
  }

  this.render = () => {
    $page.innerHTML = `
        <div class="document_tree">
        <p>DocumentTree <button class="addParent">새 문서 추가</button></p>
            <ul>
            ${this.state.map((v) => renderDocument(v)).join("")}
            </ul>
        </div>
        `;
  };
  //null에 addEvent막기 위해 page아래에서 타겟 찾음
  $page.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $button = e.target.closest("button");
    //li를 클릭시 문서로 이동
    if ($li) {
      const { id } = $li.dataset;
      $li.classList.add("selected");
      if (e.target.className !== "addSibling") {
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
