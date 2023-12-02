import { getItem, setItem } from "../../utils/index.js";

export const ToggleButton = () => {
  const openIds = getItem("openIds", []);

  const toggleDocumentList = (id) => {
    const index = openIds.indexOf(id);
    if (index === -1) {
      openIds.push(id);
    } else if (index > -1) {
      openIds.splice(index, 1);
    }
    setItem("openIds", openIds);
  };

  const openDocumentList = (id) => {
    openIds.push(id);
    setItem("openIds", openIds);
  };

  const toggleButton = (id) => {
    let isOpen = openIds.includes(id);

    return `<button data-id="${id}" class="toggle-button">
    <i class="fa-solid fa-angle-${isOpen ? "down" : "right"} toggle-icon"></i>
    </button>`;
  };

  return { openIds, toggleButton, toggleDocumentList, openDocumentList };
};
