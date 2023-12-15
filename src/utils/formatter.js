export const formatter = (content) => {
  const richContent = content
    .split('<div>')
    .map((line) => {
      line = line.replace('</div>', '');
      if (line === '') return '';
      if (line.indexOf('# ') === 0) {
        line = line.replace(/[\#]{1}(.+)/g, '<div><h1>$1</h1></div>');
      } else if (line.indexOf('## ') === 0) {
        line = line.replace(/[\#]{2}(.+)/g, '<div><h2>$1</h2></div>');
      } else if (line.indexOf('### ') === 0) {
        line = line.replace(/[\#]{3}(.+)/g, '<div><h3>$1</h3></div>');
      } else {
        line = `<div>${line}</div>`;
      }
      return line;
    })
    .join('');

  return richContent;
};
