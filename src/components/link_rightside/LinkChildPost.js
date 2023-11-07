import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";
import CreateChildPostButtonEvent from "../event/CreateChildPostButtonEvent.js";
import LinkChildPostButtonEvent from "../event/LinkChildPostButtonEvent.js";
import {
  SELECTED_POST_KEY,
  OPENED_POST_KEY,
} from "../post_leftside/PostList.js";

export default function LinkChildPost({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.className = "child-div";
  $target.appendChild($div);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    // 하위 post가 없다면 표시할 화면
    if (this.state.documents.length === 0) {
      $div.innerHTML = `
      <p>
        &nbsp;&nbsp;😧 &nbsp;작성된 하위 Documents 가 없습니다. 추가할까요?</p>
        <button class="immediately-child-post">네, 추가하고 해당 Document 로 이동하겠습니다.</button>
        `;
      return;
    }
    this.render();
  };

  this.render = () => {
    // 하위 post의 title을 뽑아서 해당 title를 버튼의 text로 갖는 버튼을 생성한다.
    $div.innerHTML = `
        <p class = "child-link-title">&nbsp;&nbsp;🔗 &nbsp;하위 Documents 바로가기</p>
        ${this.state.documents
          .map(({ id, title }) =>
            title === ""
              ? `<button class="child-link-button" data-id=${id}>제목 없음</button>`
              : `<button class="child-link-button" data-id=${id}>${title}</button>`
          )
          .join(" ")}
    `;
  };

  $div.addEventListener("click", async (e) => {
    const $button = e.target.closest("button");

    if (!$button) return;

    // 해당 버튼의 post로 이동
    if ($button.hasAttribute("data-id")) {
      const { id } = $button.dataset;
      LinkChildPostButtonEvent(id);
    }

    // 하위 post가 없다면 즉시 post를 생성할수 있도록 한다.
    if ($button.className === "immediately-child-post") {
      CreateChildPostButtonEvent(this.state.id);
    }
  });
}
