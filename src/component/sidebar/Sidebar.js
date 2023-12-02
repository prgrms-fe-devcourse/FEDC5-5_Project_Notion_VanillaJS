import request from "../../api.js";
import makeElement from "../Element.js";

import DocumentList from "./DocumentList.js";
import DocumentItem from "./DocumentItem.js";
import { addDocumentButton, serachButton, sidebarHeader } from "./DocumentOptions.js"

export default class Sidebar {
    constructor({ rootElement, onSetPage, onDeleteItem }) {
        createDOMElements(rootElement);

        this.documentList = new DocumentList(sidebarElement, onSetPage, onDeleteItem);
    }
    
    createDOMElements(rootElement) {
        const sidebarElement = makeElement('div', null, "sidebar", rootElement);

        const searchButtonElement = serachButton();
        const headerElement = sidebarHeader();
        const addDocumentButtonElement = addDocumentButton({
            onClick: () => {
                request("/documents", {
                    method: `POST`,
                    body: JSON.stringify({
                        "title": "제목 없음",
                        "parent": null
                    })
                }
                ).then(({ id, title }) => {
                    this.documentList.documentItemList.push(new DocumentItem({ id, title, documents: [] }, this.documentList.documentListElement, onSetPage, onDeleteItem));
                })
            }
        });
        sidebarElement.appendChild(headerElement);
        sidebarElement.appendChild(searchButtonElement);
        sidebarElement.appendChild(addDocumentButtonElement);
    }
}
