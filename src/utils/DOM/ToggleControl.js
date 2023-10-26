import { $ } from "./selector";

/** 사이드바 문서 토글 닫기 */
export const toggleOff = id => {
  const $parent = $(`[data-id='${id}']`);

  for (const $child of $parent.childNodes) {
    if (
      $child.className !== undefined &&
      $child.className.includes("document-title")
    ) {
      $child.style.display = "none";
    }

    // 토글 버튼 닫기
    $parent.classList.remove("toggled");
    // 토글 버튼 돌리기
    $(".toggle-btn", $parent).classList.remove("rotate-90deg");
  }
};

/** 사이드바 문서 토글 열기 */
export const toggleOn = id => {
  const $parent = $(`[data-id='${id}']`);

  for (const $child of $parent.childNodes) {
    if (
      $child.className !== undefined &&
      $child.className.includes("document-title")
    ) {
      $child.style.display = "block";
      $child.style = "padding-left:10px";
    }

    // 토글 버튼 열기
    $parent.classList.add("toggled");
  }

  // 토글 버튼 돌리기
  $(".toggle-btn", $parent).classList.add("rotate-90deg");
};
