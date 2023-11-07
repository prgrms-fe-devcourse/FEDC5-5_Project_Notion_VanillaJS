import DocumentItems from '../../Common/DocumentItems/DocumentItems.js';
import { createNewElement } from '../../../Util/Element.js';
import RouterManger from '../../../Util/Router.js';
import DocumentObserver from '../../../Util/DocumentObserver.js';
import { DOCUMENT_LIST } from '../../../Constants/Observer.js';

// state = { documentList: [] }

export default class ChildDocumentsViewer {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$documentChildList = createNewElement('section', [
            { property: 'className', value: 'document-child-list' },
        ]);

        this.$target.appendChild(this.$documentChildList);
        this.$documentChildList.addEventListener('click', (e) => this.handleOnClick(e));

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { documentList } = this.state;

        this.$documentChildList.replaceChildren();

        if (!documentList || documentList.length === 0) {
            const $empty = createNewElement('div', [{ property: 'className', value: 'empty' }]);
            const $text = createNewElement(
                'h3',
                [{ property: 'className', value: 'empty__text' }],
                '자식 document가 없습니다'
            );

            $empty.appendChild($text);
            return this.$documentChildList.appendChild($empty);
        }

        new DocumentItems({ $target: this.$documentChildList, initalState: { documentList, isRoot: true } });
    }

    async handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        if (className === 'title-toggle__title') {
            const documentId = target.closest('.document-item').dataset.id;

            // documentChild 클릭시 해당 document로 이동
            RouterManger.getInstance().changeUrl(`/document/${documentId}`);
            // 이동되면 sidebar에서도 현재 document 표시를 위해 알림을 준다.
            DocumentObserver.getInstance().notifyAll(DOCUMENT_LIST);
        }
    }
}
