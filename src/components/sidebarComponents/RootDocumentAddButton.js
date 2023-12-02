export default function RootDocumentAddButton({ $target, initialState, onAdd }) {
  const $documentAddButton = document.createElement("button");
  $documentAddButton.className = "add-button";
  $documentAddButton.type = "button";
  $target.appendChild($documentAddButton);

  this.state = initialState;

  this.render = () => {
    $documentAddButton.innerHTML = `
    <button class="header add-button" type="button">
    <i class="fa-solid fa-plus add-icon"></i>
    </button>
    `;
  };

  this.render();

  $documentAddButton.addEventListener("click", () => {
    onAdd("new");
  });
}
