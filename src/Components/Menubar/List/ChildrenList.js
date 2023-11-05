import { isCheckedToggled } from "../../../LocalStorage/LocalStorage.js";
import List from "./List.js";

export default function ChildrenList({ target, state, id, depth }) {
  /* Child Box */
  const childrenListElement = document.createElement("ul");
  childrenListElement.setAttribute(
    "class",
    "menubar_pageList_list_childrenList"
  );
  target.appendChild(childrenListElement);

  /* is toggle ? */
  if (isCheckedToggled(id)) {
    childrenListElement.classList.add("toggleChecked");
  }

  this.state = state;

  this.render = () => {
    /* 다음 깊이의 자식 생성 = 재귀 */
    this.state.forEach((list) => {
      new List({
        target: childrenListElement,
        state: list,
        depth: depth + 1,
      });
    });
  };

  this.render();
}
