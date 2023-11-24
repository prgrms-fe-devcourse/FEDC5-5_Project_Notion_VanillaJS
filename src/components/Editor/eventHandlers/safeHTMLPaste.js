import { createDebug } from "../../../shared/debug.js";

const debug = createDebug("Editor/SafeHTMLPaste");

// Ctrl+V로 인터셉트 시에는 keyup을 쓰면 e.prevent를 할 수가 없음.
// 편하게 paste event 쓰자.
export const handleSafeHTMLPaste = async (e) => {
    // 1. 붙여넣을 위치 가져오기. 무조건 block div를 가져온다.
    const $selectedNodeOrText = window.getSelection().anchorNode;
    const $target =
        $selectedNodeOrText instanceof Text
            ? $selectedNodeOrText.parentElement
            : $selectedNodeOrText;
    let spaceAdded = false;
    if ($selectedNodeOrText.textContent === "") {
        // textContent가 없으면 빈 DIV로 인식하기 때문에 DIV 속으로 innerHTML이 들어가게 됨
        // 삽입 이후 해당 textContent의 맨 앞을 제거해주면 될 듯? best 전략 ㄱ?
        // 오 space가 붙여 넣은 컨텐츠 뒤에 생김(붙여넣기 후의 커서 뒤에 space하나 있음). 신기하네.
        // 아마도 커서는 원래 위치인 (0, 1)에 머물기 때문인 듯. 굳이 바꿔주려면 range 바꿔주면 될 듯.
        // yes. 이게 맞네.
        $selectedNodeOrText.textContent = " ";
        spaceAdded = true;
    }
    debug("$target:", $target);

    // 2. 붙여 넣을 위치를 생성한다.
    // block div 이후에 br을 만들고 선택하기?

    // 3. 데이터를 html로 해석해서 가져오기
    // 이상한 style 제거하기 위해, style 자체를 아예 제거하기
    // TODO: 이 코드 때문에 우리 자체 코드는 더 이상 style을 쓸 수가 없게 됨. 해결 방법 찾기.
    // ---> 복사, 잘라내기를 인터셉트해서 클립보드 내용에서 이상한 style을 제거하는 것도 답일 듯
    // 그러면 붙여넣을 때는 아무런 처리 안해도 되니 외부 HTML 입력 시 정상적으로 동작할 듯?
    const rawHTML = e.clipboardData.getData("text/html");
    const htmlWithoutComments = rawHTML
        .split("<!--StartFragment-->")[1]
        .split("<!--EndFragment-->")[0];
    const htmlWithoutStyle = htmlWithoutComments.split(/style="[^"]*"/).join("");
    debug("data:", htmlWithoutStyle);

    // 4. 현재 Selection을 지워야 한다.
    // 같은 텍스트인 경우에는 안 지워도 된다.
    // document.execCommand("delete");

    // 지우고 나면 지운 div의 윗 div가 선택 영역이 된다.
    // 따라서 지운 div 위에 빈 div가 있으면 지운 보람이 없게 된다... 거기로 들어가기 때문에.
    // 반드시 윗 div의 text가 있을 때만 유효하다. 근데 이건 emoji 때문에 그럴 수도 있다.
    debug("after delete - selection:", window.getSelection());

    // 5. 일단 붙여 넣음
    // 빈 div를 선택하고 있는 경우 해당 div에 넣게 된다.
    // text일 때는 상관이 없다.
    document.execCommand("insertHTML", false, htmlWithoutStyle); // <div><br></div>만 남으면 한 방에 지움

    // 커서 기준 우측 글자 지우기. 선택 영역이 없어서 가능함.
    if (spaceAdded) {
        document.execCommand("forwardDelete");
    }

    // 문제: 붙여 넣은 내용이 화면 아래로 넘어가도 focus가 따라가지 않음 (기본 paste는 잘 됨)
    // Selection의 anchorNode에 scrollIntoView 실행
    // 잘 됨. 나이스하다.
    window.getSelection().anchorNode.scrollIntoView();

    e.preventDefault();
};
