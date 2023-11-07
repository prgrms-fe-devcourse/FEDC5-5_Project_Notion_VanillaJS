import RouterManger from '../Util/Router.js';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        // RouterManger에서 모든 url을 관리한다.
        RouterManger.getInstance({}).route();
    }
}
