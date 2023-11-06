export const createTemplate = (html) => {
  const $element = document.createElement('template');
  $element.innerHTML = html;

  return $element.content.firstElementChild;
};
