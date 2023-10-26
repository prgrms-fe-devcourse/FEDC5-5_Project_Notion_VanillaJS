import "./header.css";
import { navigate } from "../../utils/router";
import { $ } from "../../utils/DOM/selector.js";

/** 지금 선택된 document의 id */
export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $header.className = "header";
  $header.innerHTML = `
  <div class="header-title-container"></div>

  <div class="header-btn-container">
  <span>공유</span>
  <span>댓글</span>
  <span>시간</span>
  <span>별</span>
  <span>...</span>
  </div>`;

  $target.appendChild($header);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  /** 상위 document의 title과 id를 찾는 함수 (DOM 검색) */
  const findParent = (headerTitleArray, $now) => {
    const nowTitle = $(".document", $now).textContent;
    headerTitleArray.push({ id: this.state, title: nowTitle });

    let $parent = $now.parentElement; // 상위 dom으로 올라가기

    // root document까지 올라가기
    while ($parent && $parent.classList.contains("document-title")) {
      const parentTitle = $(".document", $parent).textContent;
      const { id } = $parent.dataset;
      headerTitleArray.push({ id: id, title: parentTitle });
      $parent = $parent.parentElement;
    }

    return headerTitleArray.reverse();
  };

  this.render = () => {
    const headerTitleArray = [];
    const $now = $(`ul[data-id="${this.state}"]`);

    if (!$now) {
      $(".header-title-container").innerHTML = "";
      return;
    }

    const parentTitles = findParent(headerTitleArray, $now);

    const headerElements = `${parentTitles
      .map(
        parent =>
          `<p data-id="${parent.id}" class="header-p" >${parent.title}</p>`,
      )
      .join("<span>/</span>")}`;

    $(".header-title-container").innerHTML = headerElements;
  };

  /** 링크 이벤트 */
  $header.addEventListener("click", ({ target }) => {
    const $p = target.closest(".header-p");

    if ($p) {
      const { id } = $p.dataset;
      navigate(`/documents/${id}`);
    }
  });
}
