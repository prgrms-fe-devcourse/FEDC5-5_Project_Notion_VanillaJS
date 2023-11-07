import LinkButton from "../common/LinkButton.js";
import { getItem } from "../../storage/Storage.js";

// 각 li를 생성하는 함수
export default function CreateListInPost({ depth, id, title }) {
  const $li = document.createElement("li");

  $li.className = "list";
  $li.setAttribute("data-id", id);

  // 로컬스토리지에 선택된li의 id를 저장하고 있다. 따라서 li의 id와 로컬스토리지에 저장된 id가 같다면
  // background-color 속성을 통해 선택된 것 처럼 보이게 만든다.
  const selectedListId = getItem("selectedListId", "");
  if (selectedListId && id === selectedListId) {
    $li.className = "selected-list";
  }

  // 재귀 함수의 depth에 따라 li에 padding-left를 준다.
  $li.style.paddingLeft = `${12 * depth}px`;

  // 토글버튼 생성
  LinkButton({
    $target: $li,
    buttonName: "<i class='fa-solid fa-angle-right'></i>",
    className: "toggle-button",
    buttonType: "toggle",
  });

  const $container = document.createDocumentFragment();

  // 텍스트 생성
  const $p = document.createElement("p");
  title === "" ? ($p.innerText = "제목 없음") : ($p.innerText = title);
  $p.className = "title";
  $container.appendChild($p);

  // 버튼 생성
  const $buttonDiv = document.createElement("div");
  $buttonDiv.className = "button-div";
  $container.appendChild($buttonDiv);

  $li.appendChild($container);

  LinkButton({
    $target: $buttonDiv,
    buttonName: "<i class='fa-solid fa-plus'></i>",
    className: "insert-button",
  });
  LinkButton({
    $target: $buttonDiv,
    buttonName: "<i class='fa-regular fa-trash-can'></i>",
    className: "delete-button",
  });

  return $li;
}
