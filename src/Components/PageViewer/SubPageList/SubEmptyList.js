export default function SubEmptyList({ target }) {
  const emptyElement = document.createElement("li");
  emptyElement.setAttribute(
    "class",
    "pageViewer_subPage_subPageList_subList empty"
  );
  emptyElement.textContent = "⛔️ 하위 페이지가 없습니다";
  target.appendChild(emptyElement);
}
