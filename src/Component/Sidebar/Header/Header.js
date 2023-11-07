import { createNewElement } from '../../../Util/Element.js';

export default class Header {
    constructor({ $target, userName }) {
        this.$target = $target;
        this.userName = userName;

        this.init();
    }

    init() {
        const $header = createNewElement('section', [{ property: 'className', value: 'header' }]);
        const $userName = createNewElement(
            'h1',
            [{ property: 'className', value: 'header__user-name' }],
            `${this.userName}`
        );

        $header.appendChild($userName);
        this.$target.appendChild($header);
    }
}
