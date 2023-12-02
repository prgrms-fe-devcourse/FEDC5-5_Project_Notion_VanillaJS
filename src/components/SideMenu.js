export default function SideMenu({
  $target,
  initialState,
  onHeaderClick,
  onSelect,
  onPlusClick,
  onDeleteClick,
}) {
  const $nav = document.createElement("nav");

  $target.appendChild($nav);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedDocumentId, documentList } = this.state;
    $nav.innerHTML =
      `<h1 class="documentList">Documents</h1>` +
      buildTree(documentList, selectedDocumentId, 0);
  };

  $nav.addEventListener("click", (e) => {
    const $h1 = e.target.closest("h1");
    if ($h1) onHeaderClick();
  });

  $nav.addEventListener("click", (e) => {
    const $li = e.target.closest("span[data-id]");
    if ($li) {
      const { id } = $li.dataset;
      onSelect(id);
    }
  });

  $nav.addEventListener("click", (e) => {
    const $postAddButton = e.target.closest("button[data-add]");
    if ($postAddButton) {
      const { add } = $postAddButton.dataset;
      const $ul = $postAddButton.parentNode.nextSibling;
      $ul.innerHTML += `<li><span><ion-icon name="radio-button-on-outline"/></span>제목없음<button> + </button><button> - </button></li>`; // Optimistic update
      onPlusClick(add);
    }
  });

  $nav.addEventListener("click", (e) => {
    const $postRemoveButton = e.target.closest("button[data-remove]");
    if ($postRemoveButton) {
      const { remove } = $postRemoveButton.dataset;
      const $li = $postRemoveButton.parentNode;
      $li.innerHTML = ""; // Optimistic update
      onDeleteClick(remove);
    }
  });

  $nav.addEventListener("click", (e) => {
    const $toggle = e.target.closest(".fold");
    if ($toggle) {
      const subCategory = $toggle.parentNode.nextElementSibling;
      subCategory.toggleAttribute("hidden");
      $toggle.classList.toggle("rotate");
    }
  });
}

const buildTree = (arr, targetId, depth) =>
  `<ul data-depth=${depth}>${arr
    .map(
      ({ id, title, documents }) =>
        `<li><span>${
          documents.length
            ? '<ion-icon name="chevron-down-outline" class="arrow"/>'
            : '<ion-icon name="radio-button-on-outline"/>'
        }</span><span class="documentTitle ${
          Number(targetId) === id ? "selected" : ""
        }" data-id="${id}">${title}</span><button data-add="${id}"> + </button><button data-remove="${id}"> - </button>
          </li>${buildTree(documents, targetId, depth + 1)}`
    )
    .join("")}</ul>`;
