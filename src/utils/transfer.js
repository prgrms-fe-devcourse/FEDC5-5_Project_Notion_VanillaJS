// innerText로 추출한 text를 마크다운 문법에 따라 HTML로 변환
export const textToHtml = (text) => {
  if (!text) return text;
  const html = text
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^##### (.+)$/gm, "<h5>$1</h5>")
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    .replace(/__(.*?)__/g, '<u>$1</u>')
    .replace(/\n/g, "<br>");

  return html;
};

// 마크다운 문법이 포함된 HTML로 변환
// 저장된 내용을 다시 편집할 때
export const textToHtmlWithTag = (text) => {
  if (!text) return text;
  const htmlWithTag = text
    .replace(/^# (.+)$/gm, "<h1># $1</h1>")
    .replace(/^## (.+)$/gm, "<h2>## $1</h2>")
    .replace(/^### (.+)$/gm, "<h3>### $1</h3>")
    .replace(/^#### (.+)$/gm, "<h4>#### $1</h4>")
    .replace(/^##### (.+)$/gm, "<h5>##### $1</h5>")
    .replace(/\*\*(.*?)\*\*/g, '<strong>**$1**</strong>')
    .replace(/\*(.*?)\*/g, '<em>*$1*</em>')
    .replace(/~~(.*?)~~/g, '<del>~~$1~~</del>')
    .replace(/__(.*?)__/g, '<u>__$1__</u>')
    .replace(/\n/g, "<br>");

  return htmlWithTag;
};
