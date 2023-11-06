import recursion from "../utils/recursion.js";
import TreeList from "./TreeList.js";

export default function DocumentTree({
  $container,
  initialState = [],
  onCreate,
  onClick,
  onDelete,
}) {
  const $tree = document.createElement("div");
  $tree.id = "document-tree";
  $container.appendChild($tree);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log("DocumentTree render");
    const $ul = document.createElement("ul");
    recursion.makeDocumentTree(this.state, $ul);
    new TreeList({ $container: $ul });
    $tree.replaceChildren($ul);

    $ul.addEventListener("click", (e) => {
      if (e.target.classList.contains("toggle-button")) {
        const $ul = e.target.closest("li").querySelector("ul");
        $ul.classList.toggle("hide");
        if ($ul.classList.contains("hide")) e.target.textContent = "▶";
        else e.target.textContent = "▼";
        return;
      }

      const $span = e.target.closest("span");
      if (!$span) return;

      const { id } = $span.dataset;
      const $selectedInput = $span.querySelector("input");
      const { className } = e.target;
      if (className.includes("add-button")) {
        $selectedInput.classList.remove("hide");
        e.target.classList.add("hide");
      } else if (className === "delete-button") onDelete(id);
      else if (id && className !== "document-title-input") onClick(id);
    });

    $ul.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;

      const $span = e.target.closest("span");
      const parent = $span.dataset.id ?? null;
      const title = e.target.value;
      onCreate({ parent, title });
    });
  };
}
