import HomeButton from "./HomeButton.js";
import PageList from "./List/PageList.js";
import NewPageButton from "./NewPageButton.js";

export default function Menubar({ target, state, onEvent }) {
  /* 왼쪽 메뉴 관련 */
  const menubarElement = document.createElement("article");
  target.appendChild(menubarElement);
  menubarElement.setAttribute("class", "menubar");

  /* 기본 초기값 */
  this.state = state;

  /* 상태 변경과 리스트에 전달  */
  this.setState = (newState) => {
    this.state = newState;
    pageList.setState(this.state);
  };

  /* Home button */

  new HomeButton({ target: menubarElement });

  /* Root page insert Event */
  new NewPageButton({ target: menubarElement, onEvent });

  /* 렌더링 */
  const pageList = new PageList({
    target: menubarElement,
    state: this.state,
    onEvent,
  });
}
