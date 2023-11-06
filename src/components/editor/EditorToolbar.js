import EditorButton from "./EditorButton.js";

import { Bold, H1, H2, H3, Italic, Link, Ol, Ul } from "../icons.js";
import { editMarkdown } from "../../utils/editorHelper.js";
import { useToolbar } from "../../utils/store.js";

/**
 * @description 편집기 뷰의 편집 유틸 툴바
 */
export default function EditorToolbar({ $parent }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "editor-toolbar");

  const $editor = $parent.querySelector("#editor");
  const $textarea = $editor.querySelector(".editor-input");

  const h1Button = new EditorButton({
    $parent: $component,
    initState: { id: "h1-button", content: H1("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "#", 1, 0);
    },
  });

  const h2Button = new EditorButton({
    $parent: $component,
    initState: { id: "h2-button", content: H2("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "##", 2, 0);
    },
  });

  const h3Button = new EditorButton({
    $parent: $component,
    initState: { id: "h3-button", content: H3("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "###", 3, 0);
    },
  });

  const boldButton = new EditorButton({
    $parent: $component,
    initState: { id: "bold-button", content: Bold("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "****", 2, 2);
    },
  });

  const italicButton = new EditorButton({
    $parent: $component,
    initState: { id: "italic-button", content: Italic("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "**", 1, 1);
    },
  });

  const linkButton = new EditorButton({
    $parent: $component,
    initState: { id: "link-button", content: Link("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "[]()", 1, 3);
    },
  });

  const ulButton = new EditorButton({
    $parent: $component,
    initState: { id: "ul-button", content: Ul("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "- ", 2, 0);
    },
  });

  const olButton = new EditorButton({
    $parent: $component,
    initState: { id: "ol-button", content: Ol("icon-editor") },
    onClick: () => {
      editMarkdown($textarea, "1. ", 3, 0);
    },
  });

  this.render = () => {
    const { visible, offsetX, offsetY } = useToolbar.state;

    if (!visible) {
      $component.style.display = "none";
      return;
    }
    $component.style.display = "flex";

    /* ISSUES - getBoundingClientRect 도 $cmponent 의 위치를 경우에 따라 다르게 잡아주는 이슈가 있음
     렌더링 순세나 과정에서 이러한 문제가 일어나는게 아닌지? */
    // const domRect = $component.getBoundingClientRect();
    // console.log("DOM: ", domRect);
    // 자식컴포넌트가 부모컴포넌트를 넘어서는지를 알기 위한 변수
    const { offsetLeft, offsetWidth } = $component;
    const toolbarOffsetRange = offsetLeft + offsetWidth;
    const parrentOffsetWidth = $parent.offsetWidth;

    console.log("offsetLeft, width", offsetLeft, offsetWidth);
    console.log(
      "toolbar offsetRight, parrentWidth",
      toolbarOffsetRange,
      parrentOffsetWidth
    );

    // 자식 컴포넌트의 offsetLeft 으로부터의 길이가 부모 컴포넌트의 길이를 넘긴 경우
    // offsetLeft 지점이 끝지점이 됨.
    $component.style.left =
      toolbarOffsetRange > parrentOffsetWidth
        ? `${offsetX - offsetWidth}px`
        : `${offsetX}px`;
    $component.style.top = `${offsetY}px`;

    $parent.appendChild($component);
  };
}
