export default function PageList({
  $target,
  initialState,
  onPageSelect,
  onSubPageAdd,
  onPageDelete,
}) {
  const $pageList = document.createElement("div");
  $pageList.className = "page_list";
  $target.appendChild($pageList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const renderPageSubTree = (pageTree, isRoot = false) => {
    return `
      <ul >
        ${pageTree
          .map(
            (page) =>
              `
            <li data-id=${page.id} class='page_item'>
              <div class='item_seperator'>
                <div class='toggle_button'>
                ${`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="toggle_svg" stroke-width="1.5" stroke="#64635E" width="15" height="15">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>`} 
                  </div>
                <div class='item_title'>${page.title}</div>
                <div class='button_group'>
                  <div class='delete_button'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#64635E" width="15" height="15">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                  </div>
                  <div class='add_button'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#64635E" width="15" height="15">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
                  </div>
                </div>
              </div>
              ${
                page.documents && page.documents.length
                  ? renderPageSubTree(page.documents)
                  : ""
              }
            </li>
          `
          )
          .join("")}</ul>
        `;
  };

  this.render = () => {
    //console.log(this.state);
    $pageList.innerHTML = renderPageSubTree(this.state, true);
  };

  $pageList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    if (id === undefined) return;
    const $closestDiv = e.target.closest("div");
    const { classList } = $closestDiv;
    //console.log(e.target.closest("div"));
    if (classList.contains("toggle_button")) {
      const $ul = $li.querySelector("ul");
      if (classList.contains("toggled")) {
        e.target.closest("div").classList.remove("toggled");
        e.target.closest("svg").style.transform = "rotate(0)";
      } else {
        e.target.closest("div").classList.add("toggled");
        e.target.closest("svg").style.transform = "rotate(90deg)";
      }

      if ($ul) {
        if ($ul && $ul.style.display === "none") {
          $ul.style.display = "block";
        } else {
          $ul.style.display = "none";
        }
      }
    } else if (classList.contains("item_title")) {
      onPageSelect(id);
    } else if (classList.contains("delete_button")) {
      onPageDelete(id);
    } else if (classList.contains("add_button")) {
      const $ul = $li.querySelector("ul");
      if ($ul) {
        if ($ul && $ul.style.display === "none") {
          $ul.style.display = "block";
        } else {
          $ul.style.display = "none";
        }
      }
      onSubPageAdd(id);
    }
  });
  this.render();
}
