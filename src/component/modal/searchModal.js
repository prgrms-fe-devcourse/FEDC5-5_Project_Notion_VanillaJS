import request from "../../api.js";
import SearchResultItem from "./searchResultItem.js";
import makeElement from "../Element.js";

const SEARCHICON_PNG_SRC = "/public/searchicon.png"

export default class SearchModal {

    constructor({ rootElement, setPage }) {

        this.createDOMElements(rootElement);
        this.setEvent(searchBgElement, searchInput, searchModalElement, setPage);
    }

    async getSearchResult(findText) {
        const result = await request("/documents", {
            method: `GET`,
        });
        const searchResult = [];
        const queue = [...result];

        while (queue.length) {
            const nowNode = queue.shift();
            if (nowNode.title && nowNode.title.includes(findText)) {
                searchResult.push({ title: nowNode.title, id: nowNode.id });
            }
            nowNode.documents.map((documentItem) => {
                queue.unshift(documentItem);
            });
        }
        return searchResult;
    }

    setEvent(searchBgElement, searchInput, searchModalElement, setPage) {
        searchBgElement.addEventListener("click", (event) => {
            if (event.target.className === "searchModalBackground") {
                searchBgElement.style.display = "none";
            }
        })

        searchInput.addEventListener("keydown", async (event) => {
            if (event.key !== "Enter") return;

            if (this.searchResultElement) {
                this.searchResultElement.remove();
                this.searchResultElement = document.createElement("div");
                searchModalElement.appendChild(this.searchResultElement);
            }
            const findText = event.target.value;
            const searchResult = await this.getSearchResult(findText);

            searchResult.map(({ title, id }) => {
                const resultItem = SearchResultItem(searchBgElement, title, id, setPage);
                this.searchResultElement.appendChild(resultItem);
            })
        });
    }

    createDOMElements(rootElement) {
        const searchBgElement = makeElement("div", null, "searchModalBackground", rootElement);
        const searchModalElement = makeElement("div", null, "searchModal", searchBgElement);
        const headerElement = makeElement("div", null, "searchHeader", searchBgElement);
        const searchIcon = makeElement("img", null, null, headerElement);
        const searchInput = makeElement("input", null, null, headerElement);
        const hr = makeElement("hr", null, null, searchModalElement);
        this.searchResultElement = makeElement("div", null, null, searchModalElement);

        searchIcon.src = SEARCHICON_PNG_SRC;
        searchInput.placeholder = "단어를 입력하고 엔터키를 눌러주세요.";
    }
}