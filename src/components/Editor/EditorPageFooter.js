import { push } from '../../route/router.js';

export default function EditorPagesFooter({$target, initialState}) {
    const $editorFooter = document.createElement('div');
    $editorFooter.classList.add('editor-footer');
    $target.appendChild($editorFooter)

    this.state = initialState;
    this.setState = newState => {
        this.state = newState;
        $editorFooter.classList.remove('show');
        this.render();
    }

    this.render = () => {
        if(!this.state || !Array.isArray(this.state.documents) || this.state.documents.length === 0) return;

        $editorFooter.classList.add('show');
        $editorFooter.innerHTML = `
            <ul>
                ${this.state.documents.map(({title, id, updatedAt}) => {
                    return `
                        <li data-id="${id}">
                            <strong>${title ? title : '제목을 입력해주세요'}</strong>
                            <span>${updatedAt.slice(0, 10)}</span>
                        </li>
                    `
                }).join('')}
            </ul>
        `;
    }

    $editorFooter.addEventListener('click', e => {
        const { target } = e;
        const { id } = target.closest('li').dataset;
        push(`/documents/${id}`);
    }) 
}