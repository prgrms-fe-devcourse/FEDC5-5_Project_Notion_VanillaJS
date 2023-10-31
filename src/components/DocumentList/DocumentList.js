import { push } from "../../utils/router.js";

export default function DocumentList({
  $target,
  initialState,
  handleDeleteDocument,
  handleAddDocument,
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
                parseInt(this.state.selectedId) === document.id ? "selected" : ""
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
                ? `<ul class="toggle-ul">${recursiveList(document.documents)}</ul>`
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

  // 토글 기능 수행 함수
  const handleToggle = (e) => {
    const $childrenUl = e.target.closest("li").querySelector(".toggle-ul");

    if ($childrenUl.children[0] === "div") {
      return;
    }

    const $toggleImg = e.target;

    if ($childrenUl.classList.contains("toggle-off")) {
      $childrenUl.classList.remove("toggle-off");
      $toggleImg.src = "/src/icons/arrow-bottom.svg";
    } else {
      $childrenUl.classList.add("toggle-off");
      $toggleImg.src = "/src/icons/arrow-right.svg";
    }
  };

  $documentList.addEventListener("click", (e) => {
    // 루트 문서 생성
    if (e.target.closest("div").matches(".add-root-document")) {
      push(`/documents/new`);
      handleAddDocument();
      return;
    }

    if (!e.target.closest("li")) return;
    const { id } = e.target.closest("li").dataset;

    // 문서 열람 & 편집
    if (e.target.matches(".document-title")) {
      const { pathname } = location;
      if (pathname === "/") {
        push(`/documents/${id}`);
      }
      if (pathname.indexOf("/documents/") === 0) {
        const [, , currentId] = pathname.split("/");
        if (currentId !== id) {
          push(`/documents/${id}`);
        }
      }
      return;
    }

    // 문서 삭제
    if (e.target.matches(".delete-document-img")) {
      handleDeleteDocument(parseInt(id));
      return;
    }

    // 자식 문서 생성
    if (e.target.matches(".add-child-img")) {
      push(`/documents/new`);
      handleAddDocument(parseInt(id));
      handleToggle(e);
      return;
    }

    // 하위 문서 토글
    if (e.target.matches(".toggle-img")) {
      handleToggle(e);
      return;
    }
  });

  this.render();
}
