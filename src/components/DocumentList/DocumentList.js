export default function DocumentList({
  $target,
  initialState,
  handleClickEvent,
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 자식 문서를 재귀로 리스트에 출력하는 함수
  const recursiveList = (documents) => {
    if (documents.length !== 0) {
      return documents
        .map(
          (document) =>
            `<li data-id=${document.id} class="document-li">
              <div class="document-list-block parent-list ${
                parseInt(this.state.selectedId) === document.id
                  ? "selected"
                  : ""
              }">
                <img class="toggle-img" src="/src/icons/arrow-${
                  document.documents.length === 0 ? "right" : "bottom"
                }.svg" />
                <img src="/src/icons/notes-book-text.svg" />
                <div class="document-title">${
                  document.title === "" ? "제목 없음" : document.title
                }</div>
                <img class="add-child-img" src="/src/icons/add.svg" />
                <img class="delete-document-img" src="/src/icons/delete.svg" />
              </div>
            ${
              document.documents.length !== 0
                ? `<ul class="toggle-ul">${recursiveList(
                    document.documents
                  )}</ul>`
                : "<ul class='toggle-ul toggle-off'><div style='color: darkgrey'>하위 문서 없음</div></ul>"
            }
          </li>`
        )
        .join("");
    }
    return "";
  };

  this.render = () => {
    $documentList.innerHTML = `
    <ul class="toggle-ul" style="padding-left: 0px;">${recursiveList(
      this.state.documents
    )}</ul>
    <div class="document-list-block add-root-document"><img src="/src/icons/add.svg" /><span>페이지 추가<span/></div>
    `;
  };

  $documentList.addEventListener("click", (e) => handleClickEvent(e));

  this.render();
}
