// markdown to html 함수
const style = "style='margin: 0px; padding: 0px;'";

const H1_REGEX = /^# (.*)/g;
const H2_REGEX = /^## (.*)/g;
const H3_REGEX = /^### (.*)/g;

const BOLD_REGEX = /\*\*(.*)\*\*/g;
const ITALIC_REGEX = /\*(.*)\*/g;

const LIST_REGEX = /^- (.*)/g;

const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

const CHECKBOX_REGEX = /^\[(x| )\] (.*)/g;
const NEW_LINE_REGEX = /\n/g;

// markdown text 를 html 로 변환해주는 함수입니다.
export function mdToHtml(mdText) {
  let prevLine = "";
  mdText = mdText.split("\n").map((line) => {
    let result = line.replace(H1_REGEX, makeHtmlTag("h1", "$1", style));
    result = result.replace(H2_REGEX, makeHtmlTag("h2", "$1", style));
    result = result.replace(H3_REGEX, makeHtmlTag("h3", "$1", style));
    result = result.replace(BOLD_REGEX, makeHtmlTag("b", "$1", style));
    result = result.replace(ITALIC_REGEX, makeHtmlTag("i", "$1", style));
    result = result.replace(LIST_REGEX, makeHtmlTag("li", "$1", style));
    result = result.replace(LINK_REGEX, makeHtmlTag("a", "$1", "href=$2"));

    // li 태그는 자동 줄바꿈이 되므로 줄바꿈을 제거해줍니다.
    prevLine = line;
    if (line.indexOf("- ") === 0 && prevLine.indexOf("- ") === 0) {
      return `${result}`;
    }

    // 나머지는 줄바꿈을 <br /> 태그로 바꿔줍니다.
    return result + "<br />";
  });
  mdText = mdText.join("");
  return mdText;
}

// html tag 를 만들어주는 함수입니다.
function makeHtmlTag(tagName, content, feature, listCount) {
  return `<${tagName} ${feature}>${content}</${tagName}>`;
}
