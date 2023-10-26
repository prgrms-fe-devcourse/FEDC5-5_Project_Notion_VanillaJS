import { request } from './api.js';

export default function DocumentsList({ $target, onSelect }) {
  /*
  영역 전체:    $listContainer
  제목:        $title
  문서 리스트:  $documentsList
  새글 버튼:    $addButton
  */
  const $listContainer = document.createElement('div');
  $listContainer.classList.add('sidebar');

  const $title = document.createElement('h3');
  $title.textContent = 'melo의 Notion';
  $listContainer.appendChild($title);

  const $documentsList = document.createElement('div');
  $listContainer.appendChild($documentsList);

  const $addButton = document.createElement('h4');
  $addButton.textContent = '새 글 추가';
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
          <span class="title">${doc.title}</span>
          <div class='buttons'>
          <button class="add-child-button">+</button>
          <button class="delete-button">-</button>
          </div>
        </summary>
        <ul>
          ${doc.documents ? `<li>${renderDocuments(doc.documents)}</li>` : ''}
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

  // 문서 클릭 (단 버튼은 클릭하지 않음)
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
