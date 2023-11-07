export const transformTag = (text) => {
  const h1Pattern = /<div>#\s+(.*?)<\/div>/g;
  const h2Pattern = /<div>##\s+(.*?)<\/div>/g;
  const h3Pattern = /<div>###\s+(.*?)<\/div>/g;
  const h4Pattern = /<div>####\s+(.*?)<\/div>/g;
  const boldPattern = />(.*?)\*\*(.*?)\*\*(.*?)</g;
  const italicPattern = />(.*?)_(.*?)_(.*?)</g;
  const strikePattern = />(.*?)~~(.*?)~~(.*?)</g;

  return text
    .replace(h1Pattern, "<div><h1>$1</h1></div>")
    .replace(h2Pattern, "<div><h2>$1</h2></div>")
    .replace(h3Pattern, "<div><h3>$1</h3></div>")
    .replace(h4Pattern, "<div><h4>$1</h4></div>")
    .replace(boldPattern, ">$1<b>$2</b>$3<")
    .replace(italicPattern, ">$1<i>$2</i>$3<")
    .replace(strikePattern, ">$1<s>$2</s>$3<")
    .replace(/&nbsp;/g, " ")
    .replace(/\n/g, "<br>")
    .replace(/<h1><br><\/h1>/g, "<br>")
    .replace(/<h2><br><\/h2>/g, "<br>")
    .replace(/<h3><br><\/h3>/g, "<br>")
    .replace(/<h4><br><\/h4>/g, "<br>")
    .replace(/<i><br><\/i>/g, "<br>")
    .replace(/<b><br><\/b>/g, "<br>")
    .replace(/<s><br><\/s>/g, "<br>");
};

export const transformText = (text) => {
  if (text.indexOf("#") === 0) {
    text = text
      .replace("#### ", "")
      .replace("### ", "")
      .replace("## ", "")
      .replace("# ", "");
  }

  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/~~(.*?)~~/g, "$1");
};

export const deleteText = (text) => {
  if (text.indexOf("#") === 0) {
    text = text
      .replace("#### ", "")
      .replace("### ", "")
      .replace("## ", "")
      .replace("# ", "");
  }

  return text
    .replace(/(.*?)\*\*(.*?)\*\*/g, "")
    .replace(/(.*?)_(.*?)_/g, "")
    .replace(/(.*?)~~(.*?)~~/g, "");
};
