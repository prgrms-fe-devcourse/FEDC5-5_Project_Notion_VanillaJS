import { $ } from "./selector";
import { documentTemplate } from "./DocumentTemplate.js";

/** 제목 수정 시 sidebar의 title DOM도 동시에 변경하는 함수  */
export const editDocumentTitle = (id, newTitle) => {
  const $now = $(`ul[data-id="${id}"]`);
  $now.querySelector(".document").textContent =
    newTitle === "" ? "제목 없음" : newTitle;
};

/** 문서 삭제 시 사이드바의 문서 DOM도 즉시 삭제하는 함수 */
export const deleteDocument = ($div, id) => {
  const $deleteTarget = $(`ul[data-id="${id}"]`);

  // 자식 요소
  const $deleteTargetSub = $div.querySelector(".document-title");

  // 자식 요소가 있는 경우
  if ($deleteTargetSub) {
    const $tempDomLi = $div.querySelector("li");
    const $tempDomUl = $div.querySelector("ul");
    $tempDomLi.style = "";
    $tempDomUl.style = "";

    $tempDomLi.remove();
    $deleteTarget.appendChild($tempDomUl);
  } else {
    // 리프 노드인 경우
    $deleteTarget.remove();
  }
};

/** 새로운 문서 추가 시 사이드바에도 문서 DOM을 즉시 추가하는 함수 */
export const createDocument = (parentId, id) => {
  if (parentId) {
    // sub 추가
    const $parent = $(`ul[data-id="${parentId}"]`);
    const display = $parent.className.includes("toggled") ? "block" : "none";
    const style = true;
    const newDocumentTemplate = documentTemplate(id, display, style);
    $parent.appendChild(newDocumentTemplate);
  } else {
    // root 추가
    const $documentListContainer = $(".document-list-container");
    const display = "block";
    const newDocumentTemplate = documentTemplate(id, display);
    $documentListContainer.appendChild(newDocumentTemplate);
  }
};
