export default function SideBarList({ $target, initialState }) {
    const $sideBarList = document.createElement("div");

    $target.appendChild($sideBarList);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const documentList = getDocumentList(this.state, "");
        $sideBarList.innerHTML = `<div>${documentList}</div>`;
    };

    const getDocumentList = (rootDocument, text) => {
        if (rootDocument.length < 1) return "";
        text += `
            <ul>
            ${rootDocument
                ?.map(({ id, title, documents }) => {
                    const returnText = `<li data-id="${id}">${title}</li>
                    ${getDocumentList(documents, text)}
                    `;
                    return returnText;
                })
                .join("")}
            </ul>
            `;

        return text;
    };

    this.render();
}
