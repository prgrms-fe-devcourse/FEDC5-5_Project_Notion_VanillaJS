import { push } from "../utils/router.js";

export default function PostList({
  $target,
  initialState,
  handleDeletePost,
  handleAddPost,
}) {
  const $postList = document.createElement("div");
  $postList.className = "post-list";
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 자식 문서를 재귀로 리스트에 출력하는 함수
  // ## 변수명 적절하게 변경하기
  // ## 토글 기능 추가하기
  // ## 제목이 일정 길이를 넘어가면 "..."으로 축약
  const recursiveList = (post) => {
    if (post.length !== 0) {
      return post
        .map((parent) => `<li data-id=${parent.id}>${parent.title}
          <button class="add-child-button">➕</button>
          <button class="delete-post-button">🗑️</button>
          ${parent.documents.length !== 0
              ? `<ul>${recursiveList(parent.documents)}</ul>`
              : ""
          }
          </li>`)
        .join("");
    }
    return "";
  };

  this.render = () => {
    $postList.innerHTML = `
    <button class="add-root-button">+</button>
    <ul>${recursiveList(this.state)}</ul>
    `;
  };

  $postList.addEventListener("click", (e) => {
    // 문서 열람 & 편집
    if (e.target.matches("li")) {
      const { id } = e.target.dataset;
      push(`/documents/${id}`);
      return;
    }

    // 루트 문서 생성
    if (e.target.matches(".add-root-button")) {
      push(`/documents/new`);
      handleAddPost();
      return;
    }

    const { id } = e.target.closest("li").dataset;

    // 문서 삭제
    if (e.target.matches(".delete-post-button")) {
      handleDeletePost(parseInt(id));
      return;
    }

    // 자식 문서 생성
    if (e.target.matches(".add-child-button")) {
      push(`/documents/new`);
      handleAddPost(parseInt(id));
      return;
    }
  });

  this.render();
}
