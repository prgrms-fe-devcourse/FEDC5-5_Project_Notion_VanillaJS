export default function contextMenuEvent({ event }) {
  const { target } = event;

  /* 우클릭 구분선 삭제 */
  if (
    target.className === "divisionLine" &&
    confirm("구분선을 삭제하시겠나요? 🔨")
  ) {
    event.preventDefault();
    target.removeAttribute("class");
    target.setAttribute("contenteditable", "true");
  }
}
