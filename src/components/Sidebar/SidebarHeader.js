export default function SidebarHeader({ $target, initialState }) {
  const $header = document.createElement("div");
  $header.className = "sidebar-header";
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `
      <p>${this.state.workspaceName}</p>
    `;
  };

  this.render();
}
