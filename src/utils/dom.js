import DocumentItem from "../components/Document/DocumentItem.js";
import { CSS_SELECTOR } from "../components/Document/cssSelector.js";
import { TAG } from "../constants/tag.js";

export const $ = (selector, element = document) =>
  element.querySelector(selector);

export const createCustomElement = ({ tag, props, children = [] }) => {
  const $element = document.createElement(tag);

  for (const prop in props) {
    $element[prop] = props[prop];
  }

  if (children.length > 0) {
    children.forEach((child) => $element.appendChild(child));
  }

  return $element;
};

export const createDocumentTree = (node) => {
  const $documentTree = createCustomElement({
    tag: TAG.LI,
    props: {
      id: CSS_SELECTOR.DOCUMENT.TREE,
    },
  });

  new DocumentItem({
    $target: $documentTree,
    state: node,
  });

  if (node.documents && node.documents.length > 0) {
    const $childrenElement = createCustomElement({
      tag: TAG.LI,
      props: {
        id: CSS_SELECTOR.DOCUMENT.CHIDREN,
      },
    });

    $childrenElement.style.paddingLeft = "20px";

    node.documents.forEach((childNode) => {
      $childrenElement.appendChild(createDocumentTree(childNode));
    });

    $documentTree.appendChild($childrenElement);
  }

  return $documentTree;
};
