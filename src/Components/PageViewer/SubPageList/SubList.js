export default function SubList({ target, state }) {
  const { id, title } = state;

  const listElement = document.createElement("li");
  listElement.setAttribute("data-id", id);
  listElement.setAttribute("class", "pageViewer_subPage_subPageList_subList");
  listElement.textContent = `✏️ ${title}`;
  target.appendChild(listElement);
}
