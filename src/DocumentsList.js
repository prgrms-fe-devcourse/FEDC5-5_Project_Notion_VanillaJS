import { request } from './api.js';

export default function DocumentsList({ $target, onSelect }) {
  const $listContainer = document.createElement('div');
  $listContainer.classList.add('sidebar');

  const $title = document.createElement('h3');
  $title.textContent = 'melo의 Notion';
  $listContainer.appendChild($title)

  const $documentsList = document.createElement('div');
  $listContainer.appendChild($documentsList);
 

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (documents) => {
    return documents
      .map(
        (doc) => `
          <details>
            <summary data-id="${doc.id}">
              ${doc.title}
              <button class="add-child-button">+</button>
              <button class="delete-button">-</button>
            </summary>
            ${doc.documents ? `<ul>${renderDocuments(doc.documents)}</ul>` : ''}
          </details>`
      )
      .join('');
    };
    
  this.render = () => {
    $documentsList.innerHTML = `
      <ul>${renderDocuments(this.state)}</ul>`;
  
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

  
  const $addButton = document.createElement('h4');
  $addButton.textContent = '새 글 추가';
  
  $addButton.addEventListener('click', async () => {
    const newDocument = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({
        title: '제목 없음',
        parent: null,
      }),
    });
  
    fetchDocuments();
    onSelect(newDocument.id);
  });
  
  $listContainer.appendChild($addButton);
  $target.appendChild($listContainer);
  
  $documentsList.addEventListener('click', (e) => {
    const $summary = e.target.closest('summary');
  
    if ($summary && !e.target.matches('button')) {
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
