import checkNewComponent from "../../utils/checkNewComponent.js";

export default function SideBarList({
    $target,
    initialState,
    addSubDocument,
    deleteCurrDocument,
    onClick,
}) {
    const self = this;
    checkNewComponent(SideBarList, self);

    const $sideBarList = document.createElement("div");

    $target.appendChild($sideBarList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    const getDocumentList = (rootDocument, text) => {
        if (rootDocument == null || rootDocument.length < 1) return "";
        text += `
        <ul>
        ${rootDocument
            ?.map(({ id, title, documents }) => {
                const returnText = `<li id="documentContainer" data-documentid="${id}"> 
                <span id="documentTitle" data-documentid="${id}">
                ${title === null ? "제목을 입력해주세요." : title}
                </span>
                <button id="addButton" data-documentid="${id}">+</button>
                <button id="deleteButton" data-documentid="${id}">-</button>
                </li>
                ${getDocumentList(documents, text)}
                `;
                return returnText;
            })
            .join("")}
            </ul>
            `;

        return text;
    };

    this.render = () => {
        const documentList = getDocumentList(this.state, "");

        $sideBarList.innerHTML = `${documentList}`;
    };
    this.render();

    $sideBarList.addEventListener("click", (e) => {
        const $li = e.target.closest("#documentContainer");

        if ($li) {
            const { id } = e.target;
            if (id === "documentContainer") return;
            const { documentid } = e.target.dataset;

            const actions = {
                addButton: addSubDocument,
                deleteButton: deleteCurrDocument,
                documentTitle: onClick,
            };
            actions[id](documentid);
            return;
        }
    });
}
