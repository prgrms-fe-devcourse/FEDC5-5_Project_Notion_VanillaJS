import { makeDocTree } from '../utils/makeDocTree.js';
import { getStorage } from '../utils/storage.js';

export default function SideNav({
  $target,
  initialState,
  onClickPlusBtn,
  onClickDeleteBtn,
  onClickDoc,
  onClickMain,
  onClickToggleBtn,
}) {
  const $sideNav = document.createElement('nav');
  $sideNav.className = 'nav-container';

  const $navUserName = document.createElement('div');
  $navUserName.className = 'nav-username';
  $navUserName.innerText = '조익준의 Notion';

  $sideNav.appendChild($navUserName);

  const $navHeader = document.createElement('div');
  $navHeader.className = 'nav-header';
  $sideNav.appendChild($navHeader);

  const $navDocuments = document.createElement('div');
  $navDocuments.className = 'nav-documents';
  $sideNav.appendChild($navDocuments);

  $target.appendChild($sideNav);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $navHeader.innerHTML = `
    <div class="nav-header-title">개인 페이지</div>
    <button data-id="root" class="nav-plus-btn">➕</button>
    `;

    let docList = [];

    const closeList = getStorage('close', []);
    const hideList = getStorage('hide', []);

    makeDocTree(this.state.docsTree, 1, docList, closeList, hideList);

    const joinDoc = docList.join('');

    $navDocuments.innerHTML = joinDoc;

    const { selectedDoc } = this.state;
    const $selDoc = document.querySelector(
      `.nav-document[data-id="${selectedDoc.id}"`
    );

    const $selDocToggleBtn = document.querySelector(
      `.nav-toggle-btn[data-id="${selectedDoc.id}"`
    );

    if ($selDoc) {
      $selDoc.classList.add('selected');
      $selDocToggleBtn.classList.add('selected');
    }
  };

  this.render();

  // onClickPlusBtn & onClickDeleteBtn & onClickDoc
  $sideNav.addEventListener('click', (e) => {
    e.stopPropagation();
    const { className, dataset, classList } = e.target;

    if (className === 'nav-plus-btn') {
      onClickPlusBtn(dataset.id);
    }

    if (className === 'nav-delete-btn') {
      onClickDeleteBtn(dataset.id);
    }

    if (
      className === 'nav-document' ||
      className === 'nav-document-container'
    ) {
      onClickDoc(dataset.id);
    }

    if (classList.contains('open') || classList.contains('close')) {
      const $button = e.target.closest('button');
      onClickToggleBtn($button.dataset.id);
    }

    if (classList.contains('nav-username')) {
      onClickMain();
    }
  });

  $navDocuments.addEventListener('mouseover', (e) => {
    const $navContainer = e.target.closest('.nav-document-container');

    if ($navContainer) {
      const { dataset } = $navContainer;

      const $plusButton = document.querySelector(
        `.nav-plus-btn[data-id="${dataset.id}"]`
      );
      const $deleteButton = document.querySelector(
        `.nav-delete-btn[data-id="${dataset.id}"]`
      );

      $plusButton.classList.remove('hidden');
      $deleteButton.classList.remove('hidden');
    }
  });

  $navDocuments.addEventListener('mouseout', (e) => {
    const $navContainer = e.target.closest('.nav-document-container');

    if ($navContainer) {
      const { dataset } = $navContainer;

      const $plusButton = document.querySelector(
        `.nav-plus-btn[data-id="${dataset.id}"]`
      );
      const $deleteButton = document.querySelector(
        `.nav-delete-btn[data-id="${dataset.id}"]`
      );

      $plusButton.classList.add('hidden');
      $deleteButton.classList.add('hidden');
    }
  });
}
