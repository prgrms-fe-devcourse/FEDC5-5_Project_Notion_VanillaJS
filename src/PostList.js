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

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li"); // postList내 클릭한 li 가져오기
    const { id } = $li.dataset;
    if ($li) {
      push(`/documents/${id}`);
    }

    const $buttonDelete = e.target.closest("li > button#delete");
    if ($buttonDelete) {
      request(`/documents/${id}`, {
        method: "DELETE",
      });
    }
  });
}
