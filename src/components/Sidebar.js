import { Component, jsx } from "@seongbin9786/my-renderer";

import { goToDocument } from "../goToDocument.js";

const username = "Seongbin Kim의 Notion";
const userEmail = "seongbin9786@uos.ac.kr";

export class DocumentListItem extends Component {
    render() {
        const { id, title, documents } = this.props;

        return jsx`
            <div className=document_list_item>
                <div 
                    className=document_list_item__title
                    data-item-id=${id}
                    onclick=${() => goToDocument(id)}
                >
                    ${title === "" ? "제목 없음" : title}
                </div>
                ${
                    documents.length === 0
                        ? null
                        : documents.map((doc) => jsx`<DocumentListItem ${doc} />`)
                }
            </div>
        `;
    }
}

export class Sidebar extends Component {
    componentDidMount() {
        // 부모여야만 bubble로 잡을 수가 있는데, 에디터와 사이드바는 형제 관계임.. how?
        // 그럼 window에 추가하면 되겠다. 나의 전역 객체.
        // TODO: 구조 개선하기
        window.addEventListener("document_title_changed", (e) => {
            const { id, title } = e.detail;

            const found = document.querySelector(
                `.document_list_item__title[data-item-id="${id}"]`,
            );
            if (!found) {
                throw new Error("sidebar에 해당 문서가 존재하지 않습니다.");
            }

            found.textContent = title;
        });
    }

    render() {
        const { rootDocumentList } = this.props;

        return jsx`
            <nav className=sidebar>
                <header className=sidebar--header>
                    <span className=sidebar--header--username>${username}</span>
                    <span className=sidebar--header--email>${userEmail}</span>
                </header>
                <div className=sidebar--tree--title>개인 페이지</div>
                <div>
                    ${rootDocumentList.map((doc) => jsx`<DocumentListItem ${doc} />`)}
                </div>
            </nav>
        `;
    }
}
