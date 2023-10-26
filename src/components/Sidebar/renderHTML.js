import { CLASS_NAME, TEXT } from "../../utils/constants.js";

export const renderDocument = (id, title, open) => {
  return `
    <div class="${CLASS_NAME.MAIN_DOCUMENT}" data-id=${id}>
      <i class="fa-solid fa-chevron-${open ? "down" : "right"} ${
    CLASS_NAME.TOGGLE_BUTTON
  }"></i>
      <p class="${CLASS_NAME.DOCUMENT_TITLE}">${title}</p>
      <div class="${CLASS_NAME.DOCUMENT_FEATURES}">
        <i class="fa-solid fa-plus ${CLASS_NAME.DOCUMENT_ADDBUTTON}"></i>
        <i class="fa-regular fa-trash-can ${
          CLASS_NAME.DOCUMENT_DELETEBUTTON
        }"></i>
      </div>
    </div>
  `;
};

export const noPageMessage = () => {
  const $text = document.createElement("p");
  $text.className = CLASS_NAME.NO_PAGE_MESSAGE;
  $text.innerText = TEXT.NO_PAGE_MESSAGE;

  return $text;
};
