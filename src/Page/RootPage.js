import { createNewElement } from '../Util/Element.js';

export default class RootPage {
    constructor({ $target }) {
        this.$target = $target;

        this.init();
    }

    init() {
        // Root 페이지는 sidebar 제외하고는 빈 Notion 페이지
        const $page = createNewElement('div', [{ property: 'className', value: 'root-wrap' }], 'Notion');

        this.$target.appendChild($page);
    }
}
