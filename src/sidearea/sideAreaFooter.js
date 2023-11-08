const $ = document;

export default function SideAreaFooter({ $target, onClickCreateNewPageButton }) {
  const $newAddButton = $.createElement("div");
  $newAddButton.innerText = "+ 새 페이지 추가";
  $newAddButton.className = "addNewPageWithoutRoot";
  $target.appendChild($newAddButton);
  $newAddButton.addEventListener("click", (e) => {
    const targetTag = e.target;
    if (targetTag.tagName === "DIV") {
      onClickCreateNewPageButton(null);
    }
  });
}
