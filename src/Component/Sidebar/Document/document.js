import DocumentList from './DocumentList/DocumentList.js';
import DocumentForm from './DocumentForm/DocumentForm.js';
import { createNewElement } from '../../../Util/Element.js';

export default class Document {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        const $document = createNewElement('setcion', [{ property: 'className', value: 'document' }]);

        // 루트 Document 추가하는 DocumentForm 컴포넌트 생성
        new DocumentForm({
            $target: $document,
            onSubmitCallback: () => this.documentList.getDocumentList(),
        });
        // DocumentList를 추가, 삭제, 토글 버튼이 있는 DocumentList 컴포넌트 생성
        this.documentList = new DocumentList({
            $target: $document,
            initalState: { documentList: [] },
        });

        this.$target.appendChild($document);
    }
}
