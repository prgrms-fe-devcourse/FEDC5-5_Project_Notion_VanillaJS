import request from "../../api.js";
import makeElement from "../Element.js";

const SLOTOPEN_PNG_SRC = "/public/slotopen.png";
const SLOTCLOES_PNG_SRC = "/public/slotclose.png";

export default class DocumentItem {

    documentItemList = [];
    isSlotOpen = false;

    constructor(item, parentElement, onSetPage, onDeleteItem) {
        this.item = item;

        if (onDeleteItem) this.onDeleteItem = onDeleteItem.bind(this);
        if (onSetPage) this.onSetPage = onSetPage.bind(this);

        this.createDOMElements(parentElement);

        item.documents.map((documentItem) => {
            this.documentItemList.push(new DocumentItem(documentItem, this.childListElement, this.onSetPage, this.onDeleteItem));
        });

        this.render();
    }

    render() {
        this.slotImgElement.src = this.isSlotOpen ? SLOTOPEN_PNG_SRC : SLOTCLOES_PNG_SRC;
        this.isSlotOpen ? this.childListElement.style.display = "block" : this.childListElement.style.display = "none";
    };

    createDOMElements(parentElement) {

        const { id, title } = this.item;

        this.parentListElement = makeElement("li", `l${id}`, "childPageList", parentElement);
        this.slotButtonElement = makeElement('button', null, null, this.parentListElement);
        this.slotImgElement = makeElement('img', `slotbtn${id}`, "slotbtn", this.slotButtonElement);
        this.documentNameLabelElement = makeElement('label', `documentbtn${id}`, null, this.parentListElement);
        this.childListElement = makeElement('ul', null, null, this.parentListElement);
        const addButtonElement = makeElement('button', `addbtn${id}`, null, this.parentListElement);
        const deleteButtonElement = makeElement('button', `deletebtn${id}`, null, this.parentListElement);

        this.parentListElement.setAttribute("titlename", title);
        this.childListElement.style.display = "none";

        this.documentNameLabelElement.textContent = title;
        addButtonElement.textContent = "+";
        deleteButtonElement.textContent = "x";

        this.setEvent(addButtonElement, deleteButtonElement, parentElement);
    }

    setEvent(addButtonElement, deleteButtonElement, parentElement) {
        this.documentNameLabelElement.addEventListener('click', (event) => {
            if (event.target.id === `documentbtn${this.item.id}`) {
                this.onSetPage(this.item.id);
            }
        });
        this.slotButtonElement.addEventListener('click', (event) => {
            if (event.target.id === `slotbtn${this.item.id}`) {
                this.isSlotOpen = !this.isSlotOpen;
                this.render();
            }
        });
        addButtonElement.addEventListener('click', async (event) => {
            if (event.target.id === `addbtn${this.item.id}`) {
                const req = request("/documents", {
                    method: `POST`,
                    body: JSON.stringify({
                        "title": "제목 없음",
                        "parent": this.item.id
                    })
                }).then(({ id, title }) => {
                    this.documentItemList.push(new DocumentItem({ id, title, documents: [] }, this.childListElement, this.onSetPage, this.onDeleteItem));
                })
            }
        });
        deleteButtonElement.addEventListener('click', (event) => {
            if (event.target.id === `deletebtn${this.item.id}`) {
                this.onDeleteItem();                                                // 낙관적 업데이트

                const removeList = [];                                     // 삭제할 때, 해당 도큐먼트의 자식들까지 찾은 후 모두 삭제
                const findChildDoucments = (node) => {
                    node.documents.map((documentItem) => {
                        findChildDoucments(documentItem);
                    });
                    return removeList.push(node.id)
                };
                findChildDoucments(this.item);

                removeList.forEach(id => {
                    console.log(id);
                    request(`/documents/${id}`, {
                        method: `DELETE`
                    });
                });
            }
            parentElement.removeChild(this.parentListElement);
        });
    }
}