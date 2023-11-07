export default function resizeMenu() {
  const $target = document.querySelector(".resizeMenu");

  this.render = () => {
    const leftSize = $target.previousElementSibling;
    const rightSize = $target.nextElementSibling;

    // 마우스 위치 저장
    let x = 0;
    let y = 0;

    let leftWidth = 0;

    const mouseDownHandler = (e) => {
      // 마우스 위치 값 가져와 할당
      x = e.clientX;
      y = e.clientY;
      // 왼쪽 엘리먼트에 뷰포트상 width 값 가져와 넣음
      leftWidth = leftSize.getBoundingClientRect().width;

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      // 마우스가 움직이면 기존 초기 마우스 위치에서 현재 위치값과의 차이를 계산
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      // 크기 조절 중 마우스 커서 변경
      document.body.style.cursor = "col-resize";

      // 이동 중 양쪽 영역(왼, 오른쪽)에서 마우스 이벤트 및 텍스트 선택 방지
      leftSize.style.userSelect = "none";
      leftSize.style.pointerEvents = "none";

      rightSize.style.userSelect = "none";
      rightSize.style.pointerEvents = "none";

      const newLeftWidth =
        ((leftWidth + dx) * 100) /
        $target.parentNode.getBoundingClientRect().width;

      leftSize.style.width = `${newLeftWidth}%`;
    };

    const mouseUpHandler = (e) => {
      // 모둔 커서 관련 사항 -> 마우스 이동 끝나면 제거
      $target.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");

      leftSize.style.removeProperty("user-select");
      leftSize.style.removeProperty("pointer-events");

      rightSize.style.removeProperty("user-select");
      rightSize.style.removeProperty("pointer-events");

      // 등록한 마우스 이벤트를 제거
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    $target.addEventListener("mousedown", mouseDownHandler);
  };
}
