export default function RootContainer({ $target, initialState, onClick }) {
  const $page = document.createElement("div");
  $page.className = "RootContainer";
  $target.appendChild($page);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    $page.innerHTML = `
    <div class="document_tree">
    DocumentTree
        <ul>
        ${initialState
          .map(
            (document) =>
              `<li data-id=${document.id}>${document.id}___${document.title}</li>`
          )
          .join("")}
        </ul>
    </div>
    `;
  };

  $page.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    onClick(id);
  });

  this.render();
}
