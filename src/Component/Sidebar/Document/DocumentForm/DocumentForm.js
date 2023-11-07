import { createNewElement } from '../../../../Util/Element.js';
import { fetchPostDocument } from '../../../../Service/PostApi.js';

export default class DocumentForm {
    constructor({ $target, onSubmitCallback }) {
        this.$target = $target;
        this.onSubmitCallback = onSubmitCallback;

        this.init();
    }

    init() {
        const $documentForm = createNewElement('form', [{ property: 'className', value: 'title-and-form' }]);
        const $title = createNewElement(
            'span',
            [{ property: 'className', value: 'title-and-form__title' }],
            'Document'
        );
        const $button = createNewElement(
            'button',
            [
                { property: 'className', value: 'title-and-form__button' },
                { property: 'title', value: 'document 추가' },
            ],
            '+'
        );

        $documentForm.appendChild($title);
        $documentForm.appendChild($button);
        this.$target.appendChild($documentForm);

        $documentForm.addEventListener('submit', (e) => this.handleOnSubmit(e));
    }

    // document 추가 핸들러
    async handleOnSubmit(e) {
        e.preventDefault();
        const res = await fetchPostDocument(null);

        if (res) {
            // 데이터를 추가 하면 documentList의 데이터를 다시 불러오는 callback 함수
            this.onSubmitCallback();
        }
    }
}
