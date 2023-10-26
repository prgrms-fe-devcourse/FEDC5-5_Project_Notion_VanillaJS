import { push } from "./router.js";
import { request } from "./api.js";

export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `<ul>
        ${this.state
          .map(
            (post) =>
              `<li data-id="${post.id}">
                ${post.title}
                <button id="add">+</button>
                <button id="delete">Delete</button>
                
            </li>`
          )
          .join("")}</ul>`;
  };

  //   this.render();

  $postList.addEventListener("click", async (e) => {
    const $li = e.target.closest("li"); // postList내 클릭한 li 가져오기
    const $buttonAdd = e.target.closest("li > button#add");
    const $buttonDelete = e.target.closest("li > button#delete");

    const { id } = $li.dataset;

    if ($li && $buttonAdd) {
      push(`/documents/new`);
    } else if ($li && $buttonDelete) {
      try {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });

        // 서버 요청이 성공하면 클라이언트 상태 업데이트
        this.state = this.state.filter((post) => post.id !== Number(id));

        this.render();
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
      }
    } else {
      push(`/documents/${id}`);
    }
  });
}
