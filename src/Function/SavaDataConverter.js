export default function SavaDataConverter(text) {
  const makeArray = text
    .replace(/(<\/div>|<\/pre>)/g, "<pass>")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#035;/g, "#")
    .replace(/&#039;/g, "'")
    .split("<pass>");

  if (makeArray[makeArray.length - 1] === "") {
    makeArray.pop();
  }

  const result = makeArray.map((item) => {
    /* 볼드체 */
    if (item.includes("<b>")) {
      item = item.replace(/<b>/, "***");
      item = item.replace(/<\/b>/, "***");
    }

    if (item.includes(' class="h1"')) {
      /* 제목 관련 */
      /* h1 */
      const text = item.replace(
        /<div contenteditable="true" class="h1">/,
        "# "
      );
      return text;
    }
    /* h2 */
    if (item.includes(' class="h2"')) {
      const text = item.replace(
        /<div contenteditable="true" class="h2">/,
        "## "
      );
      return text;
    }

    /* h3 */
    if (item.includes(' class="h3"')) {
      const text = item.replace(
        /<div contenteditable="true" class="h3">/,
        "### "
      );
      return text;
    }

    /* 구분선 관련 */

    if (item.includes(' class="divisionLine"')) {
      const text = item.replace(/<div class="divisionLine">/, "<divisionLine>");
      return text;
    }

    /* 콜 아웃 */

    if (item.includes(' class="callBox"')) {
      const text = item.replace(
        /<div class="callBox"><span class="callBox_emoji">💡<\/span><span contenteditable="true" class="callBox_textBox">/,
        "<callOut>"
      );
      return text.replace(/<\/span>/g, "");
    }
    /* 체크박스 */
    /* checked */
    if (item.includes(`class="checkbox_input" checked`)) {
      const text = item.replace(
        /<div class="checkbox"><input type="checkbox" class="checkbox_input" checked=""><label contenteditable="true" class="checkbox_text">/,
        "<[x]>"
      );

      return text.replace(/<\/label>/, "");
    }

    /* no checked */
    if (item.includes(`class="checkbox_input"`)) {
      const text = item.replace(
        /<div class="checkbox"><input type="checkbox" class="checkbox_input"><label contenteditable="true" class="checkbox_text">/,
        "<[]>"
      );
      return text.replace(/<\/label>/, "");
    }
    if (item.includes(`class="codeblock"`)) {
      const text = item.replace(
        /<pre class="prebox"><code contenteditable="true" class="codeblock">/,
        "<isCode>"
      );

      return text.replace(/<\/code>/, "");
    }

    /* 일반 div 페이지 줄 변환 */
    const text = item.replace(/<div contenteditable="true">/, "");
    return text;
  });
  return result.join("<cut>");
}
