export const markdownToHtml = (markdown) => {
  // H1 제목 변환
  markdown = markdown.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // H2 제목 변환
  markdown = markdown.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  // H3 제목 변환
  markdown = markdown.replace(/^### (.+)$/gm, "<h3>$1</h3>");

  // H4 제목 변환
  markdown = markdown.replace(/^#### (.+)$/gm, "<h4>$1</h4>");

  // H5 제목 변환
  markdown = markdown.replace(/^##### (.+)$/gm, "<h5>$1</h5>");

  // H6 제목 변환
  markdown = markdown.replace(/^###### (.+)$/gm, "<h6>$1</h6>");

  return markdown;
};

export const htmlToMarkdown = (html) => {
  // h1 제목 변환
  html = html.replace(/<h1>(.+)<\/h1>/g, "# $1");

  // h2 제목 변환
  html = html.replace(/<h2>(.+)<\/h2>/g, "## $1");

  // h3 제목 변환
  html = html.replace(/<h3>(.+)<\/h3>/g, "### $1");

  // h4 제목 변환
  html = html.replace(/<h4>(.+)<\/h4>/g, "#### $1");

  // h5 제목 변환
  html = html.replace(/<h5>(.+)<\/h5>/g, "##### $1");

  // h6 제목 변환
  html = html.replace(/<h6>(.+)<\/h6>/g, "###### $1");

  html = html.replace(/\n/g, "<br>");
  return html;
};
