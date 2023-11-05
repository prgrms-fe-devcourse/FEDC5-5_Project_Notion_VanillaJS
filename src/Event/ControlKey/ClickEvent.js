// import { blankBrowser } from "../../Router/Router.js";

export default function clickEvent({ event }) {
  const { target } = event;

  /* 체크박스 클릭 */
  if (target.className === "checkbox_input" && target.hasAttribute("checked")) {
    target.removeAttribute("checked");
    return;
  }

  if (
    target.className === "checkbox_input" &&
    !target.hasAttribute("checked")
  ) {
    target.setAttribute("checked", "");
    return;
  }
}
