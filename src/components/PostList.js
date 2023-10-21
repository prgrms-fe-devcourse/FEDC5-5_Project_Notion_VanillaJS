import { push } from "../utils/router.js";

export default function PostList({ $target, initialState, handleDeletePost }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `
    <ul>
      ${this.state
        .map(
          (post) =>
            `<li data-id=${post.id}>${post.title} <button class="delete-post-button">삭제</button></li>`
        )
        .join("")}
    </ul>
    <button class="add-post-button">+ 페이지 추가</button>
    `;
  };

  $postList.addEventListener("click", (e) => {
    if (e.target.matches("li")) {
      const { id } = e.target.dataset;
      push(`/documents/${id}`);
      return;
    }

    if (e.target.matches(".delete-post-button")) {
      // 일단 루트로 이동하고 추후 선택된 문서 id state에 추가해서 처리하기
      const { id } = e.target.closest("li").dataset;
      handleDeletePost(parseInt(id));
      return;
    }

    if (e.target.matches(".add-post-button")) {
      push(`/documents/new`);
      return;
    }
  });

  this.render();
}
