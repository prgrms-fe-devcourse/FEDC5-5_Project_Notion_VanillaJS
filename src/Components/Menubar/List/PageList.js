import { removeToggleList, setToggleList } from "../../../LocalStorage/LocalStorage.js";
import { makeRouterEvent } from "../../../Router/Router.js";
import List from "./List.js";

export default function PageList({ target, state, onEvent }) {
  /* 보유한 문서들 리스트 */
  const pageListElement = document.createElement("ul");
  pageListElement.setAttribute("class", "menubar_pageList");
  target.appendChild(pageListElement);

  /* 초기값 */
  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    /* list 기존 자식 element 삭제 */
    pageListElement.replaceChildren();
    this.render();
  };

  /* 자식 깊이 */
  const depth = 1;

  /* list 렌더링 */
  this.render = () => {
    this.state.forEach((list) => {
      new List({
        target: pageListElement,
        state: list,
        depth,
      });
    });
  };
  this.render();

  /* Event */
  pageListElement.addEventListener("click", (e) => {
    const targetElement = e.target.closest("li[data-id]");
    const { id } = targetElement.dataset;

    if (!id) return;

    const eventName = e.target.className;

    /* Click List */
    if (eventName === "menubar_pageList_list_info_title") {
      e.preventDefault();
      makeRouterEvent({ url: `/documents/${id}`, event: "push" });
    }

    /* Delete Event */
    if (eventName === "menubar_pageList_list_info_deleteButton") {
      onEvent({ id, delete: true });
    }

    /* insert Event */
    if (eventName === "menubar_pageList_list_info_insertButton") {
      onEvent({ id, insert: true });
    }

    /* Toggle Event */
    if (eventName.includes("menubar_pageList_list_info_checkbox")) {
      const checkBoxElement = targetElement.querySelector("input");
      const display = targetElement.querySelector("ul");

      if (!display.className.includes("toggleChecked")) {
        checkBoxElement.setAttribute("checked", "true");
        display.classList.add("toggleChecked");
        setToggleList(id);
        return;
      }

      if (display.className.includes("toggleChecked")) {
        checkBoxElement.removeAttribute("checked");
        display.classList.remove("toggleChecked");
        removeToggleList(id);
        return;
      }
    }
  });
}
