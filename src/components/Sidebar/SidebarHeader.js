import { CLASS_NAME } from '../../utils/constants.js';

export default function SidebarHeader({ $target, initialState }) {
  const $header = document.createElement('div');
  $header.className = CLASS_NAME.SIDEBAR_HEADER;
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `
      <p>${this.state.workspaceName}</p>
    `;
  };

  this.render();
}
