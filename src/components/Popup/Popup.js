import { Component, jsx } from "@seongbin9786/my-renderer";

import {
    handlePopUpAttachLink,
    handlePopUpFormatBold,
    handlePopUpFormatCode,
    handlePopUpFormatHeading,
    handlePopUpFormatItalic,
    handlePopUpFormatUnderline,
} from "./popupActionHandlers.js";

// TODO: 노션은 현재 선택된 영역에 해당 스타일이 적용된 경우 텍스트 색상이 파랑색으로 바뀜(inactive 시 검은색)
// TODO: [제목 1] 부분을 노션처럼 만들려면 Select로 만들어야 함.
// TODO: 링크는 링크 입력 모달을 추가로 렌더링한 후 해야 하는데 일단은 네이버 주소로 하드코딩했음.

// TODO: 팝업의 버튼을 엔터로 누를 수 있게 하기 + 버튼 눌러도 안 닫히게
// TODO: 팝업에서 ESC를 누르면 팝업이 닫히게
export class Popup extends Component {
    // 시작 상태를 안 보이게 시작해야 함. TODO: 더 좋은 방법 = ?
    render() {
        return jsx`
        <div 
            className=editor__popup
            style=${{ display: "none" }}
        >
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatHeading}
            >
                제목 1
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpAttachLink}
            >
                링크
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatBold}
            >
                <strong>B</strong>
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatItalic}
            >
                <em>i</em>
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatUnderline}
            >
                <u>U</u>
            </button>
            <button 
                className=editor__popup_item 
                onclick=${handlePopUpFormatCode}>
                ${"<>"}
            </button>
        </div>
    `;
    }
}
