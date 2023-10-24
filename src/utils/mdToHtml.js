const style = "style='margin: 0px; padding: 0px;'";

const H1_REGEX = /^# (.*)/g;
const H2_REGEX = /^## (.*)/g;
const H3_REGEX = /^### (.*)/g;
const BOLD_REGEX = /\*\*(.*)\*\*/g;
const ITALIC_REGEX = /\*(.*)\*/g;
const NEW_LINE_REGEX = /\n/g;
const LIST_REGEX = /^- (.*)/g;
const CHECKBOX_REGEX = /^\[(x| )\] (.*)/g;
const LINK_REGEX = /\[(.*)\]\((.*)\)/g;

export function mdToHtml(mdText) {
  let cnt = 0;
  mdText = mdText.split("\n").map((line) => {
    let result = line.replace(H1_REGEX, makeHtmlTag("h1", "$1", style));
    result = result.replace(H2_REGEX, makeHtmlTag("h2", "$1", style));
    result = result.replace(H3_REGEX, makeHtmlTag("h3", "$1", style));
    result = result.replace(BOLD_REGEX, makeHtmlTag("b", "$1", style));
    result = result.replace(ITALIC_REGEX, makeHtmlTag("i", "$1", style));
    result = result.replace(LIST_REGEX, makeHtmlTag("li", "$1", style));

    return result === line ? result + "<br />" : result;
  });
  // join li tags with ul tags
  mdText = mdText.join("");
  return mdText;
}

function makeHtmlTag(tagName, content, feature) {
  if (tagName === "li") {
    return `<${tagName} ${feature}>${content}</${tagName}>`;
  } else {
    return `<${tagName} ${feature}>${content}</${tagName}><br />`;
  }
}
