import { EDITOR_VALUE_CHANGE_EVENT_NAME } from "./constants.js";
import { useDocsIndex, useDocument } from "./store.js";

export function parseContent(content) {
  if (!content) return "";

  // Regular Expressions
  const h1 = /^#{1}[^#](.*)$/gm;
  const h2 = /^#{2}[^#](.*)$/gm;
  const h3 = /^#{3}[^#](.*)$/gm;
  const bold = /\*\*[^\*\n]+\*\*/gm;
  const italics = /\*([^*]+)\*/gm;
  const link = /\[[^\]]*\]\([^)]*\)/gm;

  // # -> Heading 1
  // case1
  // if (h1.test(content)) {
  //   const matches = content.match(h1);

  //   matches.forEach((element) => {
  //     const extractedText = element.slice(1);
  //     content = content.replace(element, "<h1>" + extractedText + "</h1>");
  //   });
  // }
  // case2
  content = content.replace(h1, "<h1>$1</h1>");

  // ## -> Heading 2
  content = content.replace(h2, "<h2>$1</h2>");

  // ### -> Heading 3
  content = content.replace(h3, "<h3>$1</h3>");

  // **Bold**
  if (bold.test(content)) {
    const matches = content.match(bold);

    matches.forEach((element) => {
      const extractedText = element.slice(2, -2);
      content = content.replace(
        element,
        "<strong>" + extractedText + "</strong>"
      );
    });
  }

  // *Italic*
  if (italics.test(content)) {
    const matches = content.match(italics);

    matches.forEach((element) => {
      const extractedText = element.slice(1, -1);
      content = content.replace(element, "<em>" + extractedText + "</em>");
    });
  }

  //[content](URL)
  // case 1
  // if (link.test(content)) {
  //   const links = content.match(link);

  //   links.forEach((element) => {
  //     const text = element.match(/^\[.*\]/)[0].slice(1, -1);
  //     const url = element.match(/\]\(.*\)/)[0].slice(2, -1);
  //     content = content.replace(
  //       element,
  //       '<a href="' + url + '">' + text + "</a>"
  //     );
  //   });
  // }
  //case 2
  content = content.replace(link, (match) => {
    const text = match.match(/^\[.*\]/)?.[0]?.slice(1, -1);
    const url = match.match(/\]\(.*\)/)?.[0]?.slice(2, -1);

    return `<a href="${url}">${text}</a>`;
  });

  const keywords = content.replace(/\n/gm, " ").split(" ");
  const docsMap = useDocsIndex.state.flattenMapData;

  keywords.forEach((keyword) => {
    if (docsMap && docsMap[keyword]) {
      // 정확한 문자열 매칭을 위한 정규 표현식 패턴 생성
      const keywordPattern = new RegExp(`(?<!\\S)${keyword}(?!\\S)`, "g");

      content = content.replace(
        keywordPattern,
        '<a href="' +
          `/documents/${docsMap[keyword].id}` +
          '">' +
          keyword +
          "</a>"
      );
    }
  });

  return content
    .split("\n")
    .map((line) => {
      if (!h1.test(line) && !h2.test(line) && !h3.test(line)) {
        return line.replace(line, line ? "<p>" + line + "</p>" : "<br/>");
      }
    })
    .join("");
}

export const editMarkdown = (
  textarea,
  syntax,
  prefixLen = 0,
  suffixLen = 0
) => {
  const currentSelectionStart = textarea.selectionStart;
  const currentSelectionEnd = textarea.selectionEnd;
  const currentText = textarea.value;

  // 선택된 문자열이 없는 경우
  if (currentSelectionStart === currentSelectionEnd) {
    textarea.value =
      currentText.substring(0, currentSelectionStart) +
      syntax +
      currentText.substring(currentSelectionEnd);
  } else {
    // 선택된 문자열만 잘라낸 것
    const selectedText = currentText.substring(
      currentSelectionStart,
      currentSelectionEnd
    );
    // 선택된 문자열을 제외하고 잘라낸 것
    const withoutSelection =
      currentText.substring(0, currentSelectionStart) +
      currentText.substring(currentSelectionEnd);
    // 제외 문자에 추가할 신택스를 추가
    const textWithSyntax =
      withoutSelection.substring(0, currentSelectionStart) +
      syntax +
      withoutSelection.substring(currentSelectionStart);
    // 신택스 이후에 선택된 문자열을 추가
    textarea.value =
      textWithSyntax.substring(0, currentSelectionStart + prefixLen) +
      selectedText +
      textWithSyntax.substring(currentSelectionStart + prefixLen);
  }
  // textarea cursor 위치 보정
  textarea.focus();
  textarea.selectionEnd = currentSelectionEnd + prefixLen + suffixLen;

  const nextState = {
    ...useDocument.state,
    content: textarea.value,
  };
  useDocument.setState(nextState);

  textarea.dispatchEvent(
    new CustomEvent(EDITOR_VALUE_CHANGE_EVENT_NAME, { detail: nextState })
  );
};
