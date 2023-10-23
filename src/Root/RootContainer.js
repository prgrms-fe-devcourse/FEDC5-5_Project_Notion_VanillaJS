// import { request } from "./library/api.js";
export default function RootContainer({
  $target,
  initialState,
  onClick,
  addNewDoc,
}) {
  const $page = document.createElement("div");
  $page.className = "RootContainer";
  $target.appendChild($page);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $page.innerHTML = `
    <div class="document_tree">
    <p>DocumentTree <button>추가</button></p>
        <ul>
        ${this.state
          .map(
            (document) =>
              `<li data-id=${document.id}>${document.id}___${document.title} ${
                document.documents.length !== 0
                  ? `<div>${document.documents[0].title}</div>` //일단 출력만. 재귀로 다듬읍십다. (문서 안에 문서)
                  : document.documents
              }</li>`
          )
          .join("")}
        </ul>
    </div>
    `;
  };

  $page.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $button = e.target.closest("button");
    //console.log(e.target);
    if ($li) {
      const { id } = $li.dataset;
      onClick(id);
    }
    if ($button) {
      addNewDoc();
    }
  });
}
