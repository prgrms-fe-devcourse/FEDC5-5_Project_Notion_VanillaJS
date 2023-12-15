export const createDOM = ({
  tagName = 'div',
  className = null,
  innerHTML = '',
  textContent = '',
}) => {
  const $dom = document.createElement(tagName);

  $dom.classList.add(className);
  $dom.textContent = textContent; // textContent가 innerHTML보다 우선순위가 높다.
  $dom.innerHTML = innerHTML;

  return $dom;
};

export const appendChildAll = ($parent, $children) => {
  $children.forEach(($child) => {
    $parent.appendChild($child);
  });
};

export const addEvent = ({ $dom, className, type, callback }) => {
  if (!className) {
    $dom.addEventListener(type, (e) => callback(e));
    return;
  }

  const $target = $dom.querySelector(`.${className}`);
  $target.addEventListener(type, (e) => callback(e));
};
