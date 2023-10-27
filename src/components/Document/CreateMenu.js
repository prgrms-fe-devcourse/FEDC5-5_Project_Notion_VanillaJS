export default function CreateMenu(document) {
    return document.map(({id, title, documents}) => {
        return `
            <li data-id="${id}">
                <button class="toggle">more</button>
                <span>${title ? title : '제목을 입력해주세요.'}</span>
                <div>
                    <button class="remove">-</button>
                    <button class="create">+</button>
                </div>
            
                ${documents.length > 0 ? `
                    <ul>
                        ${CreateMenu(documents)}
                    </ul>
                ` : ''}
            </li>
        `
    }).join('');
}