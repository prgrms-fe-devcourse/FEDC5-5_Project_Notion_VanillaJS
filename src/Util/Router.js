import RootPage from '../Page/RootPage.js';
import EditPage from '../Page/EditPage.js';
import Sidebar from '../Component/Sidebar/Sidebar.js';

export default class RouterManger {
    static instance = null;

    static getInstance() {
        if (!RouterManger.instance) {
            RouterManger.instance = new RouterManger();
        }
        return RouterManger.instance;
    }

    constructor() {
        if (RouterManger.instance) {
            return RouterManger.instance;
        }
        this.$target = document.querySelector('#app');

        this.init();
    }

    init() {
        new Sidebar({ $target: this.$target });
        window.onpopstate = () => this.route();
    }

    changeUrl(url) {
        history.pushState(null, null, url);
        this.route();
    }

    route() {
        const { pathname } = window.location;
        const $last = this.$target.lastElementChild;

        if ($last.className !== 'sidebar') {
            this.$target.removeChild($last);
        }

        if (pathname === '/index.html' || pathname === '/') {
            return new RootPage({ $target: this.$target });
        }

        if (pathname.indexOf('/document') === 0) {
            const documentId = pathname.split('/')[2];

            return new EditPage({ $target: this.$target, initalState: { documentId } });
        }

        new RootPage({ $target: this.$target });
    }
}
