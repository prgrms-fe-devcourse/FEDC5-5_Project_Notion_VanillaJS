import request from "../../api.js";
import makeElement from "../Element.js";

export default class Editor {

    constructor({ pageElement, onChangeTitle }) {
        this.onChangeTitle = onChangeTitle.bind(this);

        createDOMElements(pageElement);
    }

    convertHeadingTag(textHTML, e) {
        const findH1 = textHTML.split("#&nbsp;");
        const findH2 = textHTML.split("##&nbsp;");
        const findH3 = textHTML.split("###&nbsp;");
        const findH4 = textHTML.split("####&nbsp;");
        const findHeadingTagArr = [findH1, findH2, findH3, findH4];

        findHeadingTagArr.map((item, index) => {
            if (item.length < 2)
                return;
            e.target.innerHTML = item[0] + `<h${index + 1} id="cur">&nbsp;</h${index + 1}>`;
            const selection = window.getSelection();
            const range = document.createRange();
            const HeadingTag = document.getElementById('cur');
            range.selectNode(HeadingTag);
            HeadingTag.id = "";
            selection.removeAllRanges();
            selection.addRange(range);
        });
    }

    async updateDocument(title, content) {
        await request(`/documents/${this.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                "title": title,
                "content": content
            })
        });
        if (this.title !== title) {
            this.title = title;
            this.onChangeTitle(this.id, title);
        }
    }
    
    createDOMElements(pageElement) {
        const boardElement = makeElement('div', null, "editor", pageElement);
        this.titleEditorElement = makeElement('h1', null, null, boardElement);
        this.editorElement = makeElement('form', null, "textEditor", boardElement);

        this.titleEditorElement.placeholder = "제목 없음";
        this.titleEditorElement.setAttribute("contenteditable", "true");
        this.editorElement.setAttribute("contenteditable", "true");

        this.setEvent();
    }

    setEvent() {
        this.titleEditorElement.addEventListener("keyup", (e) => {
            const titleTextContent = e.target.textContent.length > 0 ? e.target.textContent : "제목 없음";
            this.updateDocument(titleTextContent, this.editorElement.textHTML);
        });

        this.editorElement.addEventListener("keyup", (e) => {
            const textHTML = e.target.innerHTML;

            this.convertHeadingTag(textHTML, e);
            this.updateDocument(this.titleEditorElement.textContent, textHTML);
        });
    }
}