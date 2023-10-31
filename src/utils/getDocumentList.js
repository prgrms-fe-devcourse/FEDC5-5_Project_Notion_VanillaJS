export const getDocumentList = (rootDocument, text, target) => {
    if (rootDocument == null || rootDocument.length < 1) return "";
    text += `
    <ul>
    ${rootDocument
        ?.map(({ id, title, documents }) => {
            const returnText = `<li id="documentContainer" class="documentContainer" data-documentid="${id}"> 
            <span id="documentTitle" data-documentid="${id}">
            ${title === null ? "제목을 입력해주세요." : title}
            </span>
            ${
                target === "$sideBarList"
                    ? `<button id="addButton" class="addButton" data-documentid="${id}">+</button>
            <button id="deleteButton" class="deleteButton" data-documentid="${id}">-</button>`
                    : ``
            }
            ${getDocumentList(documents, text, target)}
            </li>
            `;
            return returnText;
        })
        .join("")}
        </ul>
        `;

    return text;
};
