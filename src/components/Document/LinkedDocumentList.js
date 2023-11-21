import { TAG } from "../../constants/tag.js";
import { PATH } from "../../routes/path.js";
import { createCustomElement } from "../../utils/dom.js";
import LinkButton from "../Common/LinkButton.js";
import { CSS_SELECTOR } from "./cssSelector.js";

export default function LinkedDocumentList({ $target, state }) {
  this.state = state;

  const $linkedDocumentTitle = createCustomElement({
    tag: TAG.P,
    props: {
      textContent: "연관 페이지",
    },
  });

  const $linkedDocumentList = createCustomElement({
    tag: TAG.UL,
    props: { id: CSS_SELECTOR.DOCUMENT.LINKED_LIST },
  });

  const $linkedButtonGroup = createCustomElement({
    tag: TAG.DIV,
  });

  $target.appendChild($linkedDocumentList);

  this.setState = (nextState) => {
    $linkedButtonGroup.innerHTML = "";

    if (nextState && nextState.length > 0) {
      $linkedDocumentList.appendChild($linkedDocumentTitle);

      nextState.forEach((node) => {
        const { id, title } = node;

        const linkUrl = `${PATH.DOCUMENTS}/${id}`;
        const documentTitle = title && title.trim();
        const $linkedButton = new LinkButton({
          linkUrl,
          text: documentTitle === "" ? "제목을 입력해 주세요" : documentTitle,
        });
        $linkedButtonGroup.appendChild($linkedButton);
      });

      $linkedDocumentList.appendChild($linkedButtonGroup);
    } else {
      $linkedDocumentList.innerHTML = "";
    }
  };
}
