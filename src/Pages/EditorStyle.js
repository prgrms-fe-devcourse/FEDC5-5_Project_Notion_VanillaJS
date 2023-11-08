//https://dev-bak.tistory.com/16
//https://happy-playboy.tistory.com/entry/ContentEditable%EC%97%90%EC%84%9C-%EC%BB%A4%EC%84%9CCaret-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B03-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8
//https://velog.io/@1g2g/ContentEditable%EC%9D%B4%EB%9E%80
export default function EditorStyle({ $target, onStyle }) {
  const $div = document.createElement("div");
  $div.className = "styleDiv";
  $target.appendChild($div);

  //서식 버튼 리팩토링
  const createButton = (id, text, style) => {
    const button = document.createElement("button");
    button.id = id;
    button.innerHTML = text;
    button.addEventListener("click", () => onStyle(style));
    return button;
  };
  const $editorMenu = document.createElement("div");
  $editorMenu.className = "editor-menu";

  const buttons = [
    { id: "btn-bold", text: "<b>B</b>", style: "bold" },
    { id: "btn-italic", text: "<i>I</i>", style: "italic" },
    { id: "btn-underline", text: "<u>U</u>", style: "underline" },
    { id: "btn-strike", text: "<s>S</s>", style: "strikeThrough" },
    { id: "btn-ordered-list", text: "OL", style: "insertOrderedList" },
  ];

  buttons.forEach(({ id, text, style }) => {
    $editorMenu.appendChild(createButton(id, text, style));
  });

  this.render = () => {
    $div.innerHTML = "";
    $div.appendChild($editorMenu);
  };

  this.render();

  //드래그 후 글씨체 스타일 변경 바 나오게 하는 기능(노션처럼)
  const formatBar = document.querySelector(".styleDiv");
  let isDragging = false;

  $target.addEventListener("mousedown", (e) => {
    isDragging = true;
  });

  $target.addEventListener("mouseup", () => {
    //formatBar.style.display 값은 none이아닌 빈 값으로 들어간다!!
    if (formatBar.style.display === "" && isDragging) {
      const selection = window.getSelection();
      //type이 Range면 현재 텍스트가 드래그 되었다는 것
      if (selection.type === "Range") {
        // Selection 객체 내에서 선택한 텍스트 범위 중에서 첫번째 인덱스 범위를 가져온다.
        const range = selection.getRangeAt(0);
        $div.classList.remove("disappear");
        $div.classList.add("appear");
        //위 range 객체에서 선택한 텍스트의 위치와 크기를 화면상의 좌표로 반환한다.
        //rect 객체는 DOMRect 타입이다.
        const rect = range.getBoundingClientRect();

        showFormatBar(rect.left, rect.bottom);
        //여기서 isDragging을 false해줘야 드래그는 끝났고, 드래그된 데이터가 선택되었다는 의미
        isDragging = false;
      }
    }
  });

  $target.addEventListener("click", () => {
    //서식바가 보여지고있는 상태(즉 드래그된 데이터가 있음을 의미)
    //그리고 isDragging이 true인 상태(즉 mousedonw으로 true가 됐음을 의미)

    //그러면 서식바를 없애준다.

    if (formatBar.style.display === "block" && isDragging) {
      $div.classList.remove("appear");
      $div.classList.add("disappear");
      formatBar.style.display = "";
    }
  });

  const showFormatBar = (x, y) => {
    formatBar.style.display = "block";
    formatBar.style.left = x + "px";
    formatBar.style.top = y + 10 + "px";
  };
}

/*
1234567 에서 345를 드래그하면
아래처럼 로그 출력
anchor와 base는 커서의 시작 정보를, 
extent와 focus는 커서의 끝 정보를 가지고 있다.
anchorNode: text
anchorOffset: 2      -> 시작 오프셋
baseNode: text
baseOffset: 2      -> 시작 오프셋
extentNode: text
extentOffset: 5    -> 끝나는 오프셋
focusNode: text
focusOffset: 5     -> 끝나는 오프셋
isCollapsed: false   ->isCollapsed는 시작 커서와 끝 커서의 위치의 동일 여부를 판단해준다.
rangeCount: 1
type: "Range"
*/

/*
Selection.getRangeAt()메서드는
 현재 선택된 범위 중 하나를 나타내는 범위 개체를 반환합니다.
 반환 값이 Range 객체다.
*/

/*

Renge객체

Range.collapsed 
범위의 시작 지점과 끝 지점이 동일한 위치에 있는지 여부를 나타내는 부울 값을 반환합니다.

Range.commonAncestorContainer
및 노드 Node를 포함하는 가장 깊은 항목을 반환합니다 .startContainerendContainer

Range.endContainer 
Node종료 되는 범위 를 반환합니다 Range.

Range.endOffset 
endContainer끝 의 위치를 ​​나타내는 숫자를 반환합니다 Range.

Range.startContainer 
Node시작 되는 범위 를 반환합니다 Range.

Range.startOffset 
startContainer시작 위치를 나타내는 숫자를 반환합니다 Range.
*/

/*
Element.getBoundingClientRect() 메서드는 
엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환합니다.
*/

/*
 DOMRect 객체
  left, top, right, bottom, x, y, width, height 프로퍼티는 
  전반적인 사각형의 위치와 크기를 픽셀 단위로 나타냅니다. 
  width와 height가 아닌 다른 프로퍼티는 뷰포트의 top-left에 상대적입니다.
*/
