import { getData } from "../../api/Api.js";
import { getItem, setItem } from "../../storage/Storage.js";
import { OPENED_POST_KEY } from "../post_leftside/PostList.js";

// 토글 버튼 클릭 시
export default async function ToggleButtonEvent(id, $li) {
  const data = await getData(id);
  // 하위 post를 변수에 담는다.
  const childLists = data.documents;

  if (childLists.length === 0) return;

  // 하위 post들을 하나씩 확인하며 id를 배열에 담는다.
  const everyChildId = [];
  childLists.forEach((childList) => {
    everyChildId.push(parseInt(childList.id));
  });

  //li의 모든 형제 ul들을 변수에 담는다.
  const $childUls = $li.parentNode.querySelectorAll("ul");

  const $toggleButton = $li.querySelector(".toggle-button");

  // ul 중에 하나라도 children-post-blocK이라면 open 상태이다.
  if (!$childUls[0].classList.contains("children-post-block")) {
    const showLists = getItem(OPENED_POST_KEY, []);
    // 모든 id를 로컬스토리지에 저장한다.
    everyChildId.forEach((childId) => showLists.push(parseInt(childId)));
    setItem(OPENED_POST_KEY, showLists);
    $childUls.forEach(($childUl) => {
      $childUl.classList.remove("children-post");
      $childUl.classList.add("children-post-block");
    });
    // 토글 버튼은 아래 화살표를 통해 Open된 것처럼 보여지게 한다.
    $toggleButton.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
  } else {
    // 만약 children-post라면 close 상태다.
    const showLists = getItem(OPENED_POST_KEY, []);
    // 하위 post의 id가 로컬스토리지에 저장되지 않도록 처리한다.
    const newShowLists = showLists.filter((openedId) => {
      if (everyChildId.includes(parseInt(openedId)) === false) {
        return parseInt(openedId);
      }
    });
    setItem(OPENED_POST_KEY, newShowLists);
    $childUls.forEach(($childUl) => {
      $childUl.classList.remove("children-post-block");
      $childUl.classList.add("children-post");
    });
    // 토글 버튼은 오른쪽 화살표를 통해 close된 것처럼 보여지게 한다.
    $toggleButton.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
  }
}
