export default function Welcome({ $parent }) {
  const $element = document.createElement("div");
  $element.setAttribute("id", "welcome");

  this.render = () => {
    $parent.appendChild($element);
    $element.innerHTML = `
        <div class="app-title">
            <a class="app-title-symbol">
                Lemon Tree 
            </a>
            <span class="app-tree">
              🪴
            </span>
        </div>
    `;
  };
}
