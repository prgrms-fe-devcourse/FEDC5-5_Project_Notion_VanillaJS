export default function SubPageTitle({ target, state }) {
  const titleElement = document.createElement("h3");
  titleElement.setAttribute("class", "pageViewer_subPageList_title");
  target.appendChild(titleElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    titleElement.textContent = `"${this.state}" 의 하위 페이지 📝`;
  };
}
