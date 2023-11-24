import { EMOJI_EMPTY_DOC_HTML } from "../../assets/EMOJI_EMPTY_DOC.js";
import { goToDocument } from "../../goToDocument.js";

// TODO: 핸들러에 필요한 인자를 제공하거나 핸들러를 클로저에서 정의하기 (클래스로 정의하는 게 나을 듯)
// TODO: 툴팁 표시도 구현하기
export const createDropdownItems = (documentId) => [
    {
        imageUrl: "https://www.notion.so/images/blocks/text/ko-KR.png",
        name: "텍스트",
        description: "일반 텍스트를 사용해 쓰기를 시작하세요.",
        handler: () => alert("텍스트"),
    },
    {
        imageUrl: "https://www.notion.so/images/blocks/page.83b0bf31.png",
        name: "페이지",
        description: "이 페이지 안에 하위 페이지를 만드세요.",
        handler: async () => {
            // TODO: 페이지 블럭 생성 기능 구현하기

            // 1. 페이지 생성 API를 호출하고 id를 받아온다.
            const parentId = documentId;
            // 현재 페이지 id가 우선 필요함...
            // 일단 상태 관리는 전역으로 하자
            const { id } = await window.api.create(parentId);

            // 2. id를 div의 프로퍼티로 놓고(data-page-id) 저장 API를 호출한다.
            // 이건 셀렉션이 있으니깐 그냥 div 넣으라고 하면 댈듯?
            // 텍스트 상에서 Caret 선택 중이어도 그냥 아래 div로 갈 듯? 제발.
            const pageLinkHTML = `
                <div>
                    <div 
                        contenteditable=false
                        class=editor__page_link
                        data-page-id=${id}
                    >
                        ${EMOJI_EMPTY_DOC_HTML}
                        <span class=editor__page_link_title>${id}</span>
                    </div>
                </div>
            `
                .replace(/\s{2,}/g, " ") // 긴 공백 제거
                .replace(/(?!>) (?=<)/g, ""); // 남은 공백 제거

            // 3. div를 만들고 입력하고, 클릭 핸들러를 만들고, 저장한다.
            // TODO: 클릭 시 해당 페이지로 이동하는 기능 필요함
            // 근데 이게 [/]일 수도 있고, [/page ]일 수도 있음.
            // 또한 기존 textNode 뒤일 수도 있음. how?
            // 그냥 anchorNode가 text일텐데 그 text의 마지막 /를 포함해 뒤를 날리면 될 듯
            // 이건 js로 해도 됨. 곧장 page 이동을 하기 때문에 history 필요 없음.
            // range 연습 삼아 해봄.
            // TODO: selection 쪽 코드는 유틸로 빼는 게 좋을 듯
            const $targetTextNode = window.getSelection().anchorNode;
            const targetString = $targetTextNode.textContent.toString();
            // 그냥 강제로 선택하게 할까?
            const range = document.createRange();
            range.setStart($targetTextNode, targetString.lastIndexOf("/"));
            range.setEnd($targetTextNode, targetString.length);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("delete"); // 선택 영역 제거

            // TODO: 왜 div를 먼저 넣어야 div가 밑으로 가는지 알려줘~!!!
            // FIXME: 버그 해결하기. 또 중첩 div 문제가 다시 재발해버렸다.
            // 페이지 만든 경우 이렇게 됨. 혹시 여기서도 공백이 필요한가? 그런듯?
            // 일단 공백이 있는 div에 /로 페이지 생성하면 괜찮음.
            // 얘가 원인인 듯. 얘가 div 안으로 들어감
            document.execCommand("insertHTML", false, " <div><br></div>");
            document.execCommand("insertHTML", false, pageLinkHTML);
            // 임시 방편....
            document.getElementsByClassName("editor__dropdown").item(0).style.display = "none";

            // 4. 저장 API를 호출한다.
            const currentTitle = document.getElementsByClassName("editor__title").item(0).innerHTML;
            const currentContent = document
                .getElementsByClassName("editor__content_root")
                .item(0).innerHTML;

            // 굳이 await 할 필요 없을 듯
            window.api.update(parentId, currentTitle, currentContent);

            // 생성 후 이동해야지.
            await window.api.create(parentId);

            // 5. 신규 페이지로 이동한다.
            // history를 어떻게 이용해야 하지?
            goToDocument(id);

            // TODO: 에디터에서 신규 컨텐츠 로딩하는 구조 만들어야 함. 후.. 이제 에디터 갈아엎기 시작이다...

            // TODO: [이름 동기화] 나중에 할 건데, 매번 로딩할 때마다 바꿀 계획임. 다른 탭 열고 수정하는 건 미반영
            // 페이지를 열 때, 렌더링하기 전에, data-page-id인 블럭에 대해 root documents에서 id를 찾아 이름을 입력해준다.
        },
    },
    {
        imageUrl: "https://www.notion.so/images/blocks/header.57a7576a.png",
        name: "제목 1",
        description: "섹션 제목(대)",
        handler: () => alert("제목 1"),
    },
];
