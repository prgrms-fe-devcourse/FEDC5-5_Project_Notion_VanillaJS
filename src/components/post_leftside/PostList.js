import Post from "./Post.js";
import { request } from "../../api/Api.js";
import CreateListInPost from "./CreateListInPost.js";
import SelectPostEvent from "../event/SelectPostEvent.js";
import InsertButtonEvent from "../event/InsertButtonEvent.js";
import DeleteButtonEvent from "../event/DeleteButtonEvent.js";
import NewpageButtonEvent from "../event/NewpageButtonEvent.js";
import ToggleButtonEvent from "../event/ToggleButtonEvent.js";

export const OPENED_POST_KEY = "showId"; // side-bar에 보여줄 post들의 id
export const SELECTED_POST_KEY = "selectedListId"; // 현재 선택된 post의 id

export default function PostList({ $target }) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  this.getPostListApi = async () => {
    const rootData = await request("");
    this.setState(rootData);
  };

  let isRender = false; // 렌더 체크
  let newPageButtonRender = false;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 한 번 렌더가 되었을 때, $div의 HTML을 초기화 하고 시작
    if (isRender === true) {
      $div.innerHTML = "";
      isRender = false;
    }

    this.state.forEach(({ id, title, documents }) => {
      const $ul = document.createElement("ul");
      // 루트 post는 따로 먼저 li를 만들어준다.
      const $li = CreateListInPost({ depth: 0, id, title });

      $ul.appendChild($li);
      $div.appendChild($ul);

      // 루트 post의 하위 documents를 탐색하며 dom에 추가하는 재귀함수
      Post({
        depth: 1,
        id,
        title,
        documents,
        $target: $ul,
      });

      const $openedCheck = $li.nextSibling; // ul
      const $toggleButton = $li.querySelector(".toggle-button");
      if ($openedCheck) {
        // children-post-block : 하위 post들을 보여주는 상태
        if ($openedCheck.classList.contains("children-post-block")) {
          // 토글 버튼 아래 화살표
          $toggleButton.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
        } else {
          $toggleButton.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
        }
      }
    });

    isRender = true;

    // 새 페이지 추가 버튼
    const $newPageDiv = document.createElement("div");
    $target.append($newPageDiv);

    // 새 페이지 추가 버튼이 한 번만 렌더되기 위해 체크
    if (!newPageButtonRender) {
      const $li = document.createElement("li");
      $li.className = "newpage-button";
      $target.appendChild($li);

      const $p = document.createElement("p");
      $p.className = "newpage-button";
      $p.innerHTML = `<i class='fa-solid fa-plus'></i>&nbsp;&nbsp;&nbsp;새 페이지 추가  ✏️`;
      $li.appendChild($p);
      newPageButtonRender = true;
    }
  };

  const $parentElement = document.querySelector("#side-bar");

  $parentElement.addEventListener("click", async (e) => {
    const { className } = e.target;
    const $li = e.target.closest("li");
    const { id } = $li.dataset;

    function hasClassName(className, nameList) {
      return nameList.some((name) => name === className);
    }

    // post 선택 시 이벤트 처리
    if (hasClassName(className, ["list", "title"])) {
      SelectPostEvent(id);
      // 추가 버튼 클릭 시 이벤트 처리
    } else if (hasClassName(className, ["insert-button", "fa-solid fa-plus"])) {
      InsertButtonEvent(id);
      // 삭제 버튼 클릭 시 이벤트 처리
    } else if (
      hasClassName(className, ["delete-button", "fa-regular fa-trash-can"])
    ) {
      DeleteButtonEvent(id);
      // 새 페이지 버튼 클릭 시 이벤트 처리
    } else if (hasClassName(className, ["newpage-button"])) {
      NewpageButtonEvent();
      // 토글 버튼 클릭 시 이벤트 처리
    } else if (
      hasClassName(className, [
        "toggle-button",
        "fa-solid fa-angle-right",
        "fa-solid fa-angle-down",
      ])
    ) {
      ToggleButtonEvent(id, $li);
    }
  });
}
