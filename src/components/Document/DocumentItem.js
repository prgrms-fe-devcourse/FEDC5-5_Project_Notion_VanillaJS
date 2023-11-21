import { TAG } from "../../constants/tag.js";
import { createCustomElement } from "../../utils/dom.js";
import { IconSVG } from "../Common/IconSVG.js";
import { CSS_SELECTOR } from "./cssSelector.js";

export default function DocumentItem({ $target, state }) {
  const documentTitle = state.title?.trim();

  const $expandBtn = createCustomElement({
    tag: TAG.BUTTON,
    props: {
      id: CSS_SELECTOR.DOCUMENT.EXPAND_BTN,
      innerHTML: IconSVG.expand,
    },
  });

  const $documentTitle = createCustomElement({
    tag: TAG.DIV,
    props: {
      id: CSS_SELECTOR.DOCUMENT.TITLE_GROUP,
      textContent:
        documentTitle === "" ? "제목을 입력해 주세요" : documentTitle,
    },
  });

  const $titleElement = createCustomElement({
    tag: TAG.DIV,
    props: {
      id: CSS_SELECTOR.DOCUMENT.TITLE,
    },
    children: [$expandBtn, $documentTitle],
  });

  const $addBtn = createCustomElement({
    tag: TAG.BUTTON,
    props: {
      id: CSS_SELECTOR.DOCUMENT.ADD_BTN,
      innerHTML: IconSVG.add,
    },
  });

  const $deleteBtn = createCustomElement({
    tag: TAG.BUTTON,
    props: {
      id: CSS_SELECTOR.DOCUMENT.DELTE_BTN,
      innerHTML: IconSVG.delete,
    },
  });

  const $itemButtonElement = createCustomElement({
    tag: TAG.DIV,
    props: {
      id: CSS_SELECTOR.DOCUMENT.BUTTON,
    },
    children: [$addBtn, $deleteBtn],
  });

  const $documentItem = createCustomElement({
    tag: TAG.DIV,
    props: {
      id: CSS_SELECTOR.DOCUMENT.ITEM,
    },
    children: [$titleElement, $itemButtonElement],
  });

  $documentItem.dataset.id = state.id;

  $target.appendChild($documentItem);
}
