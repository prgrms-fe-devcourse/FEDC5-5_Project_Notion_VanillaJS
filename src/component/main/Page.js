import request from "../../api.js";
import makeElement from "../Element.js";

import Editor from "./Editor.js";
import PageTitle from "./PageTitle.js";
import notDatapage from "./tempPage/notdataPage.js";

export default class Page {

    constructor({ rootElement, onChangeTitle }) {

        this.createDOMElements(rootElement, onChangeTitle)
        this.setEvent();
    }

    createDOMElements(rootElement, onChangeTitle) {
        this.pageElement = makeElement('div', null, 'page', rootElement);
        this.notDatapageElement = notDatapage();

        this.PageTitle = new PageTitle(this.pageElement);
        this.editor = new Editor({ pageElement: this.pageElement, onChangeTitle });
        this.pageElement.style.display = "block";

        rootElement.appendChild(this.notDatapageElement);
    }

    async getDocument(id) {
        if (this.pageElement.style.display === "none") {
            this.pageElement.style.display = "block";
            this.notDatapageElement.style.display = "none";
        }

        this.id = id;
        this.editor.id = id;
        this.PageTitle.setBreadCrumb(id);

        const { title, content } = await request(`/documents/${this.id}`, { method: `GET` });
        this.editor.titleEditorElement.textContent = title;
        this.editor.editorElement.innerHTML = content;

        const path = `/documents/${this.id}`;
        history.pushState(null, null, path);
    }

    showNotDataPage() {
        this.pageElement.style.display = "none";
        this.notDatapageElement.style.display = "block";
    }



    setEvent() {
        window.addEventListener('popstate', e => {
            const { pathname } = location;
            const path = pathname.replace(window.location.origin, '');
            const id = path.replace('/documents/', "");
            this.getDocuments(id);
        });
    }
}