import { createDebug } from "../../../shared/debug.js";

const debug = createDebug("Dropdown");

// mouseup 직후의 상태는 selection이 제거되어도 제거된 것을 인식하지 못 함.
// setTimeout이 왜 되는지 모르겠지만, 됨.
// keyup 필요. keydown에서는 setTimeout 이어도 안 됨.

// TODO: 마우스로 드래그할 때는 좀 이상한 듯? 드래그했을 때 안 뜰 때가 있음. 확인 필요
// FIXME: 역방향 드래그로 하면 인식이 안 됨.
// 아니, 왜 될 때가 있고 안 될 때가 있지?
// TODO: ESC 눌러야만 꺼지는데, 왜 ESC 누르면 꺼지는지 알아보기
export const displayDropdownOnMouseEvent = () => {
    setTimeout(() => {
        const $dropdown = document.getElementsByClassName("editor__dropdown").item(0);

        // 1. Selection은 위치 확인 용도
        // 무조건 textNode가 걸린다. slash를 입력했기 때문에.
        const s = window.getSelection();
        const oRange = s.getRangeAt(0); //get the text range
        const oRect = oRange.getBoundingClientRect();
        debug(s, oRange);

        // 그냥 top, left만 주면 선택 영역과 popup이 겹침.
        // height만큼 top에서 빼주면 딱 위에 붙음. 여기서 대충 한 10px 정도 더 빼주면 무난할 듯
        // fadein-fadeout도 만들면 좋겠다.
        // 그리고 그냥 css로 처리하는 게 좋을 듯? 물론 top/left는 js로 해야겠지만.
        // TODO: 화면 꽤 하단에서 /를 누르면, 되게 올라간 위치에서 표시함.
        $dropdown.style.removeProperty("display");
        $dropdown.style.top = `${oRect.bottom + 4}px`;
        $dropdown.style.left = `${oRect.left}px`;
    }, 0);
};

// keydown 필요
export const openDropdownOnSlash = (e) => {
    // setTimeout은 selection 반영을 위함.
    setTimeout(() => {
        // shiftKey=true일 때는 ?도 통과하기 때문에 필터
        if (e.code !== "Slash" || e.shiftKey) {
            return;
        }

        // 명령 창 띄우기 - popup처럼
        displayDropdownOnMouseEvent();
    }, 0);
};

// keydown 필요
// SlashSpaceSpace => 닫힘
export const closeDropdownOnDeleteSlash = () => {
    // CASE 1: anchorNode가 div (텍스트가 업고, innerHTML = "<br>")
    // CASE 2: anchorNode가 textNode (텍스트가 남아 있음)
    // CASE 3: anchorNode가 root (innerHTML = "")
    // setTimeout은 selection 반영을 위함.
    setTimeout(() => {
        const $dropdown = document.getElementsByClassName("editor__dropdown").item(0);

        const s = window.getSelection();
        const $target = s.anchorNode;

        if ($target.nodeName === "DIV") {
            // 어차피 텍스트는 없는 상태
            $dropdown.style.display = "none";
            return;
        }

        // textContent는 String 자체가 아니다.
        if (!$target.toString().includes("/")) {
            $dropdown.style.display = "none";
        }
    }, 0);
};

// const execDropdownOnEnter = () => {
// TODO: slash 이후의 명령어 입력 시 Enter를 치는데 이 때 명령을 인식하고 실행해야 함.
// CASE 1: 명령이 없는 경우
// /Enter => /가 사라지고 창도 닫힘
// /SpaceEnter => 다 사라지고 창도 닫힘
// /조나단Enter => [결과 없음]으로 나오고 Enter가 무시됨
// CASE 2: 명령이 있는 경우
// 1. Text => 아래에 개행 후 포커스해줌
// 2. H1 => 아래에 개행 후 포커스해줌
// 3. Table => 동일
// };

// $editor.addEventListener("keydown", execDropdownOnEnter);
