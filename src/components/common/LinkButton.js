// 버튼 생성하고 dom에 추가하는 함수
export default function LinkButton({
  $target,
  buttonName,
  className,
  buttonType,
}) {
  const $button = document.createElement("button");
  $button.innerHTML = buttonName;
  $button.className = className;
  $button.type = buttonType;
  $target.appendChild($button);
}
