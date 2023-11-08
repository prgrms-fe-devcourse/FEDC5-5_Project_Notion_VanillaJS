const $ = document;
export default function SideAreaHeader({ $target, onReturnMainPage }) {
  const $sideBarHeader = $.createElement("div");
  $sideBarHeader.innerText = "📱Notion Cloing By KSJ";
  $sideBarHeader.className = "sideBarHeader";
  $sideBarHeader.addEventListener("click", () => {
    const returnToHome = confirm("메인 화면으로 돌아가시겠습니까?");
    if (returnToHome) {
      onReturnMainPage();
    }
  });
  $target.prepend($sideBarHeader);
}
