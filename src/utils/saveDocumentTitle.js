import { setItem } from './storage.js';

const SAVE_DOCUMENT_TITLE_KEY = 'SAVE_DOCUMENT_TITLE_KEY';

export const addSaveDocumentTitleEvent = optimisticTitleUpdate => {
  window.addEventListener(SAVE_DOCUMENT_TITLE_KEY, e => {
    const { title, id } = e.detail;
    setItem(`${SAVE_DOCUMENT_TITLE_KEY}-${id}`, title);
    optimisticTitleUpdate();
  });
};

export const saveDocumentTitleEvent = (title, id) => {
  window.dispatchEvent(new CustomEvent(SAVE_DOCUMENT_TITLE_KEY, { detail: { title, id } }));
};
