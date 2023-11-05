export default function EditInfo({ target, state }) {
  const infoElement = document.createElement("div");
  infoElement.setAttribute("class", "pageViewer_editor_info");
  target.appendChild(infoElement);

  const createdAtElement = document.createElement("p");
  createdAtElement.setAttribute("class", "pageViewer_editor_info_createdAt");
  infoElement.appendChild(createdAtElement);

  const updatedAtElement = document.createElement("p");
  updatedAtElement.setAttribute("class", "pageViewer_editor_info_updatedAt");
  infoElement.appendChild(updatedAtElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { createdAt, updatedAt } = this.state;
    /* data type convert date */
    const createdTime = new Date(createdAt);
    const updatedTime = new Date(updatedAt);

    createdAtElement.textContent = `Create - ${createdTime.toLocaleString()}`;
    updatedAtElement.textContent = `Update - ${updatedTime.toLocaleString()}`;
  };
}
