import { MESSAGE, TEXT } from './constants.js';

export const isNew = (isNew) => {
  try {
    if (!isNew) {
      throw new Error(MESSAGE.NOT_NEW_INSTANCE);
    }
  } catch (e) {
    console.error(e);
  }
};

export const generateTitle = (title) => {
  if (typeof title === 'string') {
    return title.length > 0 ? title : TEXT.UNTITLED;
  }
};

export const setDocumentTitle = (title) => {
  if (typeof title === 'string') {
    document.title = generateTitle(title);
  }
};

export const generateTextIndent = (depth) => 12 * depth;

export const generateRouteDocuments = (id) => `/documents/${id}`;
