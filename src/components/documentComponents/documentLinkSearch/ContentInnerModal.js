import CommandList from "./CommandList.js";
import DocumentLinkList from "./DocumentLinkList.js";

export default function ContentInnerModal({ $target, selectionStart, option }) {
  const $contentInnerModal = document.createElement("div");
  $contentInnerModal.className = "content-inner-modal";
  $contentInnerModal.contentEditable = false;
  console.log(selectionStart);
  if (selectionStart < 28) {
    $contentInnerModal.style.left = `${selectionStart === 1 || 6 ? 0 : selectionStart + 60}px`;
  } else {
    $contentInnerModal.style.right = `${selectionStart + 22}px`;
  }

  $target.appendChild($contentInnerModal);

  this.close = () => {
    $contentInnerModal.remove();
  };

  if (option === "command") {
    return new CommandList({
      $parent: $target,
      $target: $contentInnerModal,
      onClose: () => {
        const $textNode = $target.childNodes[0];
        if ($textNode && $textNode.nodeType === Node.TEXT_NODE) {
          const $text = $textNode.nodeValue;
          const extractedText = $text.slice(-6);
          const newText = $text.slice(0, -extractedText.length);
          $textNode.nodeValue = newText;
        }

        this.close();
      },
    });
  } else if (option === "link") {
    return new DocumentLinkList({
      $parent: $target,
      $target: $contentInnerModal,
      initialState: {
        documentLinks: [],
      },
      onClose: () => {
        this.close();
      },
    });
  }

  return $contentInnerModal;
}
