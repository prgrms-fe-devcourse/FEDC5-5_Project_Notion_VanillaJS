import request from "../../api.js";
import DocumentItem from "./DocumentItem.js";
import makeElement from "../Element.js";

export default class DocumentList {

    documentItemList = [];

    constructor(sidebarElement, onSetPage, onDeleteItem) {
        this.documentListElement = makeElement('ul', null, "parentPageList", sidebarElement);
        this.onSetPage = onSetPage;
        this.onDeleteItem = onDeleteItem;

        this.init();
    }
    async init() {
        this.documentlist = await request("/documents");
        this.documentlist.map((documentitem) => {
            this.documentItemList.push(new DocumentItem(documentitem, this.documentListElement, this.onSetPage, this.onDeleteItem));
        });
    }
    updateDocumentTitle(id, title) {                                // 낙관적 업데이트
        const findNode = () => {
            const queue = [...this.documentItemList];
            while (queue.length) {
                const nowNode = queue.shift();
                if (nowNode.item.id === id) {
                    return nowNode;
                }
                nowNode.documentItemList.map((documentItem) => {
                    queue.unshift(documentItem);
                });
            }
            return null;
        };
        const node = findNode();

        if (!node) return;

        node.parentListElement.setAttribute("titlename", title);
        node.documentNameLabelElement.textContent = title;
    }
}

