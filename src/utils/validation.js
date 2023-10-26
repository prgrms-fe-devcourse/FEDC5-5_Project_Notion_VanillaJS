import { UNTITLED } from "./constants.js";

export const isNew = (isNew) => {
  try {
    if (!isNew) {
      throw new Error("new 없이 호출됨");
    }
  } catch (e) {
    console.error(e);
  }
};

export const generateTitle = (title) => {
  if (typeof title === "string") {
    return title.length > 0 ? title : UNTITLED;
  }
};

export const setDocumentTitle = (title) => {
  if (typeof title === "string") {
    document.title = generateTitle(title);
  }
};

export const generateTextIndent = (depth) => 12 * depth; // 들여쓰기
