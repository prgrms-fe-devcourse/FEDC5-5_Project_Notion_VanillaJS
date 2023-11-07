import DocumentItems from '../DocumentItems.js';
import { createNewElement } from '../../../../Util/Element.js';
import { DOCUMENT_TOGGLE_KEY, getItem } from '../../../../Store/LocalStroage.js';
// state = { id: "", title = "", documents: [] }

export default class DocumentItem {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { id, title, documents } = this.state;
        const toggleList = getItem(DOCUMENT_TOGGLE_KEY, []);
        const documentId = window.location.pathname.split('/')[2];
        const $li = createNewElement('li', [
            {
                property: 'className',
                value: 'document-item',
            },
            { property: 'dataset.id', value: id },
        ]);
        const $titleButton = createNewElement('div', [
            {
                property: 'className',
                value: `${documentId && Number(documentId) === id ? 'title-button--current' : 'title-button'}`,
            },
        ]);
        const $titleToggle = createNewElement('div', [{ property: 'className', value: 'title-toggle' }]);
        const $title = createNewElement(
            'span',
            [{ property: 'className', value: 'title-toggle__title' }],
            title ? title : '제목 없음'
        );
        const $toggleButton = createNewElement(
            'button',
            [{ property: 'className', value: 'title-toggle__toggle--hidden' }],
            '>'
        );
        const $insertDelete = createNewElement('div', [{ property: 'className', value: 'insert-delete' }]);
        const $insertButton = createNewElement(
            'button',
            [{ property: 'className', value: 'insert-delete__insert' }],
            '+'
        );
        const $deleteButton = createNewElement(
            'button',
            [{ property: 'className', value: 'insert-delete__delete' }],
            'x'
        );

        // documentId가 열람된 상태의 list에 포함되어 있다면 버튼 클래스를 토글하여 ui를 변경한다
        if (id && toggleList.includes(String(id))) {
            $toggleButton.classList.toggle('title-toggle__toggle--view');
            $toggleButton.classList.toggle('title-toggle__toggle--hidden');
        }

        this.$target.appendChild($li);
        $li.appendChild($titleButton);
        $titleButton.appendChild($titleToggle);
        $titleButton.appendChild($insertDelete);
        $titleToggle.appendChild($toggleButton);
        $titleToggle.appendChild($title);
        $insertDelete.appendChild($insertButton);
        $insertDelete.appendChild($deleteButton);

        // 현재 document에 자식 documets가 존재하면 현재 $li를 부모로 하여 하위에 다시 ul 태그를 생성한다.
        if (documents.length > 0) {
            new DocumentItems({
                $target: $li,
                initalState: { documentList: documents, isRoot: false, documentId: id },
            });
        }
    }
}
