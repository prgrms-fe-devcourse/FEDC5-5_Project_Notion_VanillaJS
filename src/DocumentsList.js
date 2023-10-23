import { request } from './api.js';

export default function DocumentsList({ $target, onSelect }) {
  const $documentsList = document.createElement('div');
  $target.appendChild($documentsList);

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const renderDocuments = (documents) => {
      return documents
        .map(
          (doc) => `
            <li data-id="${doc.id}">
              ${doc.title}
              ${
                doc.documents
                  ? `<ul>${renderDocuments(doc.documents)}</ul>`
                  : ''
              }
              </li>`
              // 하위 문서 존재할 경우 재귀 호출)
              )
        .join('');
    };

    $documentsList.innerHTML = `
    <h1>Notion</h1>
    <ul>${renderDocuments(this.state)}</ul>`;
  };

  $documentsList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;
      onSelect(id);
    }
  });

  const fetchDocuments = async () => {
    const docs = await request('/documents');
    this.setState(docs);
  };

  fetchDocuments();
}
