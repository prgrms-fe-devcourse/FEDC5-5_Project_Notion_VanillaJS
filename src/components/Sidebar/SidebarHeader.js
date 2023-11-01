import { push } from '../../utils/router.js';

export default function SidebarHeader({ $target, onDocumentAdded }) {
  const $sidebarHeader = document.createElement('div');
  $target.appendChild($sidebarHeader);
  $sidebarHeader.className = 'sidebar-header';

  this.render = () => {
    $sidebarHeader.innerHTML = `
    <div class="sidebar-header-name">
      <img class="logo" src="../../../images/logo.png" alt="Logo">
      <h3><b>재웅</b>님의 Obsidian</h3>
    </div>
    <button class="sidebar-header-add-button">
      <i class="fa fa-plus" />
      새 문서 작성하기
    </button>`;
  };

  $sidebarHeader.addEventListener('click', (e) => {
    const $addButton = e.target.closest('.sidebar-header-add-button');
    const $logoHeader = e.target.closest('h3');

    if ($addButton) {
      onDocumentAdded(null);
    } else if ($logoHeader) {
      push('/');
    }
  });

  this.render();
}
