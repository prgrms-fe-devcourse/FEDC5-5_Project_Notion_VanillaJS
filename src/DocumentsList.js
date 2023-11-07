import { request } from './utils/api.js';

export default function DocumentsList({ $target, onSelect }) {
  /*
  영역 전체:    $listContainer
  제목:        $user
  문서 리스트:  $documentsList
  새글 버튼:    $addButton
  */
  const $listContainer = document.createElement('div');
  $listContainer.classList.add('sidebar');

  const $user = document.createElement('h3');
  $user.textContent = 'melo의 Notion';
  $listContainer.appendChild($user);

  const $documentsList = document.createElement('div');
  $listContainer.appendChild($documentsList);

  const $addButton = document.createElement('h4');
  $addButton.textContent = '페이지 추가';
  $listContainer.appendChild($addButton);

  $target.appendChild($listContainer);

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  /*
  문서 목록 불러오기
  재귀를 통해 하위 문서도 불러온다.
  details 태그를 통해 토글형식으로 하위 문서가 보였다 안보였다 처리.
  */
  const renderDocuments = (documents) => {
    return documents
      .map(
        (doc) => `
        <details>
        <summary data-id="${doc.id}">
          <span class="document-title">${doc.title}</span>
          <div class='document-buttons'>
            <button class="add-child-button"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#6d6c68}</style><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
            <button class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><style>svg{fill:#6d6c68}</style><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
          </div>
        </summary>
        <ul>
        ${
          doc.documents && doc.documents.length > 0
            ? `<li>${renderDocuments(doc.documents)}</li>`
            : '<li class="empty">하위 페이지 없음</li>'
        }
        <ul>
      </details>`
      )
      .join('');
  };

  this.render = () => {
    $documentsList.innerHTML = `
      <ul>${renderDocuments(this.state)}</ul>`;

    /* 
    '+' 버튼 이벤트 (새 하위 문서 추가)
    클릭시 버블링 방지. 새 글 POST. 현재 id를 전달하여 현재 문서의 하위 문서임을 명시
    새 글 작성 이후 문서를 새로 불러온다.
    */
    const $addChildButtons = document.querySelectorAll('.add-child-button');
    $addChildButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        e.stopPropagation();

        const { id } = e.target.closest('summary').dataset;
        await request('/documents', {
          method: 'POST',
          body: JSON.stringify({
            title: '제목 없음',
            parent: id,
          }),
        });

        fetchDocuments();
      });
    });

    /*
    '-' 버튼 이벤트 (현재 문서 삭제)
    클릭시 버블링 방지. 현재 id를 전달하여 해당 문서를 삭제
    state 값인 문서 배열에 현재 문서를 제외하도록 한다.
    이후 새로 fetch 받아 렌더링 진행.
    */
    const $deleteButtons = document.querySelectorAll('.delete-button');
    $deleteButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        e.stopPropagation();

        const { id } = e.target.closest('summary').dataset;
        await request(`/documents/${id}`, { method: 'DELETE' });

        this.state = this.state.filter((doc) => doc.id !== id);
        fetchDocuments();
      });
    });
  };

  // 새 root 문서 추가
  $addButton.addEventListener('click', async () => {
    const newDocument = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({
        title: '제목 없음',
        parent: null,
      }),
    });

    fetchDocuments();
    // onSelect를 통해 새로 만든 문서를 화면에 띄워준다.
    onSelect(newDocument.id);
  });

  // 문서 클릭시 이벤트
  $documentsList.addEventListener('click', (e) => {
    const $summary = e.target.closest('summary');

    // 문서 제목 클릭시에만 반응
    if (e.target.matches('span')) {
      const { id } = $summary.dataset;
      onSelect(id);
    }
  });

  const fetchDocuments = async () => {
    const docs = await request('/documents');
    this.setState(docs);
  };

  fetchDocuments();
}
