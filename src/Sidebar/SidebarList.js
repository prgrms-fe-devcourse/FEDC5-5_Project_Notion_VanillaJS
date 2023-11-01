import { push } from '../router/router.js';

export default function SidebarList({
  $target,
  initialState,
  delDocument,
  addDocument,
}) {
  this.state = initialState;
  const $sidebartitle = document.createElement('div');
  $sidebartitle.className = 'sidebar__content';
  $target.appendChild($sidebartitle);

  const renderTree = (documents) => `
  <ul>
    ${documents
      .map(
        (doc) => `
        <li data-id="${doc.id}" class="document__item">
          <div class="document__item__main">
            <button class="toggle">
              ${
                doc.documents && doc.documents.length > 0
                  ? `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`
                  : `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`
              }
            </button>
            <button class="doc">
              <img src="/src/img/doc.svg" alt="페이지 이미지" />
            </button>
            <span class="text">${doc.title}</span>
            <button class="delete">
              <img src="/src/img/delete.svg" alt="페이지 삭제 이미지" />
            </button>
            <button class="add">
              <img src="/src/img/add.svg" alt="페이지 추가 이미지" />
            </button>
          </div>
          ${
            doc.documents && doc.documents.length > 0
              ? renderTree(doc.documents)
              : ''
          }
        </li>
      `,
      )
      .join('')}
  </ul>
`;

  $sidebartitle.addEventListener('click', (e) => {
    const $button = e.target.closest('button');
    const $li = e.target.closest('li');
    // 버튼 선택
    if ($li && $button && $button.className) {
      const { id } = $li.dataset;
      switch ($button.className) {
        case 'toggle':
          if ($li.querySelector('ul')) {
            const $ul = $li.querySelector('ul');
            $ul.classList.toggle('hidden');

            if ($ul.className === 'hidden') {
              $button.innerHTML = `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`;
            } else {
              $button.innerHTML = `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`;
            }
          }
          break;
        case 'delete':
          delDocument(id);
          break;
        case 'add':
          addDocument(id);
          break;
        default:
          break;
      }
    }
    // 문서 클릭
    else if ($li) {
      const { id } = $li.dataset;
      push(`/posts/${id}`);
    }
  });

  this.render = () => {
    $sidebartitle.innerHTML = renderTree(this.state);
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}
