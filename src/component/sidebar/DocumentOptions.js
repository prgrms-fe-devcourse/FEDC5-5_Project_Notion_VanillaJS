import makeElement from "../Element.js";

const JLOGO_PNG_SRC = "/public/jlogo.png"
const PLUSICON_PNG_SRC = "/public/plusicon.png"
const SEARCHICON_PNG_SRC = "/public/searchicon.png"


export function sidebarHeader() {
    const headerElement = makeElement('div', null, "sidebarheader", null);
    const imgElement = makeElement('img', null, null, headerElement);
    const textElement = makeElement('span', null, null, headerElement);

    textElement.textContent = "JuJangGwon의 노션";
    imgElement.src = JLOGO_PNG_SRC;

    return headerElement;
}

export function addDocumentButton({ onClick }) {
    const addDocumentButtonElement = makeElement('button', null, "addDocumentButton", null);
    const imgElement = makeElement('img', null, null, addDocumentButtonElement);
    const textElement = makeElement('span', null, null, addDocumentButtonElement);

    imgElement.src = PLUSICON_PNG_SRC;
    textElement.textContent = "페이지 추가";

    addDocumentButtonElement.addEventListener('click', () => {
        onClick();
    });
    return addDocumentButtonElement;
}

export function serachButton() {
    const findDocumentButtonElement = makeElement('button', null, "addDocumentButton", null);
    const imgElement = makeElement('img', null, null, findDocumentButtonElement);
    const textElement = makeElement('span', null, null, findDocumentButtonElement);

    imgElement.src = SEARCHICON_PNG_SRC;
    textElement.textContent = "검색";

    findDocumentButtonElement.addEventListener('click', () => {
        const modalElement = document.querySelector('.searchModalBackground');

        modalElement.style.display = "block";
    });
    return findDocumentButtonElement;
}

