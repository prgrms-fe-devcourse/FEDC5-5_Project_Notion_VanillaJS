import { Component, jsx } from "@seongbin9786/my-renderer";

import { goToDocument } from "../../goToDocument.js";
import { closeDropdownOnDeleteSlash, openDropdownOnSlash } from "./eventHandlers/attachDropdown.js";
import { checkSelectionAndDisplayPopup } from "./eventHandlers/attachPopup.js";
import { handleFormatShorcut } from "./eventHandlers/formatShortcut.js";
import {
    handlePlaceholderOnKeyEvent,
    handlePlaceholderOnMouseEvent,
} from "./eventHandlers/placeholderOnEmptyBlock.js";
import { handleSafeHTMLPaste } from "./eventHandlers/safeHTMLPaste.js";
import { handleEditorUndo } from "./eventHandlers/undo.js";

// TODO: 파서에서 공백을 포함한 string도 처리할 수 있게
const TITLE_PLACEHOLDER = "제목 없음";

export class Editor extends Component {
    // 제목 변경 시 탭 제목 갱신
    handleTitleChange(e) {
        const title = e.target.value;
        document.title = title;

        const { currentDocument } = this.props;
        const { id } = currentDocument;

        // TODO: 사이드바 업데이트하기
        // 이거는 좀 애매한뎅?
        // Sidebar 내부에서 핸들링할 수 밖에 없을 듯?
        window.dispatchEvent(
            new CustomEvent("document_title_changed", {
                detail: {
                    id,
                    title,
                },
                bubbles: false, // 현재는 window로 통신
            }),
        );
    }

    // 페이지 링크 클릭 시 이동하게
    handlePageLinkClick(e) {
        const { pageId } = e.target.dataset;
        if (!pageId) {
            return;
        }

        goToDocument(pageId);
    }

    // TODO: debounce 넣기
    async handleAutoSave() {
        const titleText = document.getElementsByClassName("editor__title").item(0).value;
        const contentHTML = document
            .getElementsByClassName("editor__content_root")
            .item(0).innerHTML;

        const { currentDocument } = this.props;
        const { id } = currentDocument;

        await window.api.update(id, titleText, contentHTML);
    }

    handleKeyDown(e) {
        handlePlaceholderOnKeyEvent(e);
        openDropdownOnSlash(e);
        closeDropdownOnDeleteSlash(e);
    }

    handleKeyUp(e) {
        this.handleAutoSave(e);

        // 분리 전 코드 순서대로 등록
        checkSelectionAndDisplayPopup(e);
        handleEditorUndo(e);
        handleFormatShorcut(e);
    }

    handleMouseUp() {
        checkSelectionAndDisplayPopup();
    }

    handleClick(e) {
        this.handlePageLinkClick(e);
        handlePlaceholderOnMouseEvent();
    }

    componentDidMount() {
        const { currentDocument } = this.props;
        const { title } = currentDocument;

        // 탭 제목 갱신
        document.title = title;
    }

    render() {
        // 최초 렌더링 시 사용
        const { currentDocument } = this.props;
        const { id, title, content: contentHTML } = currentDocument;

        return jsx`
            <main 
                className=editor
                onkeydown=${this.handleKeyDown.bind(this)}
                onkeyup=${this.handleKeyUp.bind(this)}
                onmouseup=${this.handleMouseUp.bind(this)}
                onclick=${this.handleClick.bind(this)}
                onpaste=${handleSafeHTMLPaste}
            >
                <input 
                    className=editor__title
                    contentEditable=true
                    placeholder=${TITLE_PLACEHOLDER}
                    oninput=${this.handleTitleChange.bind(this)}
                    value=${title}
                />
                <div
                    className=editor__content_root
                    contentEditable=true
                    tabIndex=0
                    dangerouslySetInnerHTML=${contentHTML}
                />
                <Popup />
                <Dropdown documentId=${id} />
            </main>
        `;
    }
}
