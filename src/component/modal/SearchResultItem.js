import makeElement from "../Element.js";

export default function SearchResultItem(searchBgElement, title, id, setPage) {

    if (setPage) setPage = setPage.bind(this);

    const SearchResultItemElement = makeElement('div', null, null, null);
    const titleElement = makeElement('p', null, null, SearchResultItemElement);

    titleElement.textContent = title;
    SearchResultItemElement.addEventListener('click', () => {
        setPage(id);
        searchBgElement.style.display = "none";
    });

    return SearchResultItemElement;
}