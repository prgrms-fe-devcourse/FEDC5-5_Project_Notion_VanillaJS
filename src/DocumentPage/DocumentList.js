import { push } from "../router.js";

export default function DocumentList({
  $target,
  initialState,
  onDelete,
  onPost,
}) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);
  const mainDocumentId = 105841;

  this.state = initialState;

  // nextState로 변경 후 상태에 따라 그리기
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 하위 문서를 트리 형태로 만들어주는 템플릿 생성
  this.createMenuTree = (documents) => {
    return documents
      .map((doc) => {
        return `<li data-id=${doc.id} class="document-item">
          <div class="document-item-container">
            <div class="item_content">
              <img class="document-icon" src="/src/assets/img/doc.png"/>${
                doc.title
              }
            </div>
            <div class="item_buttons">
              <img class="add-btn" src="/src/assets/img/add.png"/>
              <img class="delete-btn ${
                doc.id === mainDocumentId ? "blocked" : "" // 메인 문서(첫 문서)는 삭제 불가능하도록
              }" src="/src/assets/img/delete.png"/>
            </div>
          </div>
          ${
            doc.documents
              ? `<ul style="margin-left:14px">${this.createMenuTree(
                  doc.documents
                )}</ul>`
              : ""
          }
        </li>`;
      })
      .join("");
  };

  this.render = () => {
    $documentList.innerHTML = `
    <ul>
      <li data-id="new" class="document-item-container">새로운 문서 추가하기 +</li>
      ${this.createMenuTree(this.state)}
      </ul>`;
  };

  // 문서 목록 클릭 시 /documents/${id}로 url 변경
  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;

      // delete 버튼 클릭 시 onDelete(id) 호출
      if (e.target.classList.contains("delete-btn")) {
        onDelete(id);
        return;
      }

      // add 버튼 클릭 시 onPost(id) 호출
      if (e.target.classList.contains("add-btn")) {
        onPost(id);
        return;
      }

      console.log("클릭...");
      // /documents/${id}로 url 바꿈
      push(`/documents/${id}`); // 이벤트 dispatch
    }
  });
}
