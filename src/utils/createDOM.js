import styleInJS from '../style/tagStyles.js';

export default function createDOM({ $target, tagName = 'div', content, style, setAttribute }) {
  const $element = document.createElement(tagName);
  content && ($element.textContent = content);
  style && styleInJS({ $target: $element, styleTagName: style });
  setAttribute && setAttribute.forEach(attr => $element.setAttribute(attr[0], attr[1]));
  $target.appendChild($element);

  return $element;
}
