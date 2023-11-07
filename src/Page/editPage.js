import DocumentManager from '../Component/DocumentManager/DocumentManager.js';
import { createNewElement } from '../Util/Element.js';

// state = { documentId : ""}

export default class EditPage {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        const $page = createNewElement('div', [{ property: 'className', value: 'editor-wrap' }]);

        // DocumentManager는 editor, childList를 관리하는 부모 컴포넌트
        this.documentManager = new DocumentManager({
            $target: $page,
            initalState: { ...this.state, isView: true, title: '', content: '' },
        });

        this.$target.appendChild($page);
    }
}
