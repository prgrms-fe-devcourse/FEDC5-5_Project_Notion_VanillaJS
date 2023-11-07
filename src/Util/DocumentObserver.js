export default class DocumentObserver {
    static instance = null;

    static getInstance() {
        if (!DocumentObserver.instance) {
            DocumentObserver.instance = new DocumentObserver();
        }
        return DocumentObserver.instance;
    }

    constructor() {
        if (DocumentObserver.instance) {
            return DocumentObserver.instance;
        }
        this.observers = [];
    }

    printObservers() {
        console.log(this.observers);
    }

    subscribe(key, observer) {
        if (!this.observers[key]) {
            this.observers[key] = [];
        }
        this.observers[key].push(observer);
    }

    unsubscribe(key, observer) {
        if (this.observers[key]) {
            this.observers[key] = this.observers[key].filter((obs) => obs !== observer);
        }
    }

    notifyAll(key) {
        if (this.observers[key]) {
            this.observers[key].forEach((observer) => observer());
        }
    }
}
