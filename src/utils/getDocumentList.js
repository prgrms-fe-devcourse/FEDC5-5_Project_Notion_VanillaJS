export const getDocumentList = (rootDocument, text, target) => {
    if (rootDocument == null || rootDocument.length < 1) return "";
    text += `
    <ul>
    ${rootDocument
        ?.map(({ id, title, documents }) => {
            const returnText = `<li id="documentContainer" data-documentid="${id}"> 
            <span id="documentTitle" data-documentid="${id}">
            ${title === null ? "제목을 입력해주세요." : title}
            </span>
            ${
                target === "$sideBarList"
                    ? `<button id="addButton" data-documentid="${id}">+</button>
            <button id="deleteButton" data-documentid="${id}">-</button>`
                    : ``
            }
            </li>
            ${getDocumentList(documents, text, target)}
            `;
            return returnText;
        })
        .join("")}
        </ul>
        `;

    return text;
};
