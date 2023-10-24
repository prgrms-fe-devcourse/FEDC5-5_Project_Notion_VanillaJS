export default function SideBarList({
    $target,
    initialState,
    addSubDocument,
    deleteCurrDocument,
}) {
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
                const returnText = `<li id="documentList" data-documentid="${id}">${title}
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
        const $li = e.target.closest("#documentList");

        if ($li) {
            const { id } = e.target;
            const { documentid } = e.target.dataset;
            console.log(id);
            // console.log(documentid);
            const actions = {
                addButton: addSubDocument,
                deleteButton: deleteCurrDocument,
            };
            actions[id](documentid);
            return;
        }
    });
}
