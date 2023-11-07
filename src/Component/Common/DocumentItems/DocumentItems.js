import DocumentItem from './DocumentItem/DocumentItem.js';
import { createNewElement } from '../../../Util/Element.js';
import { DOCUMENT_TOGGLE_KEY, getItem } from '../../../Store/LocalStroage.js';

// state = { documuentList: [], isRoot: boolean, documentId: null || number }

export default class DocumentItems {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const { documentList, isRoot, documentId } = this.state;
        const toggleList = getItem(DOCUMENT_TOGGLE_KEY, []);
        const className = isRoot ? 'document-items--root' : 'document-items';
        const $documentItems = createNewElement('ul', [{ property: 'className', value: `${className}` }]);
        const $fragment = document.createDocumentFragment();

        documentList?.forEach((item) => new DocumentItem({ $target: $fragment, initalState: { ...item } }));

        // documentId가 열람된 toggleList에 포함되어있다면 클래스를 변경하여 보여준다.
        if (documentId && toggleList.includes(String(documentId))) {
            $documentItems.classList.toggle('view');
        }

        $documentItems.appendChild($fragment);
        this.$target.appendChild($documentItems);
    }
}
