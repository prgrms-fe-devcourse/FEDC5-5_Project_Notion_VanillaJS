import { push } from '../../utils/router.js';

export default function EditorFooter({
  $target,
  initialState,
  onDocumentClick,
}) {
  const $editorFooter = document.createElement('div');
  $target.appendChild($editorFooter);
  $editorFooter.className = 'editor-footer';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const renderDocuments = (documents) => {
      return `
          ${documents
            .map(
              (document) => `
              <button class="link-button" data-id="${document.id}">${
                document.title
              }</button>

              ${document.documents ? renderDocuments(document.documents) : ''}
              `,
            )
            .join('')}`;
    };

    if (this.state.documents) {
      $editorFooter.innerHTML = `
      <div style="font-size:18px; margin-bottom:12px">
        <b>${this.state.title}</b>의 하위 문서
      </div>
      
      ${
        this.state.documents.length > 0
          ? renderDocuments(this.state.documents)
          : '<p style="color:#a0a0a0">하위 문서가 존재하지 않습니다.</p>'
      }`;
    }
  };

  $editorFooter.addEventListener('click', (e) => {
    const $linkButton = e.target.closest('.link-button');

    const { id } = $linkButton.dataset;
    onDocumentClick(id);
    push(`/documents/${id}`);
  });

  this.render();
}
