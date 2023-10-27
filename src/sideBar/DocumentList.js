import { push } from "../utils/router.js";
import DocumentAddButton from "./DocumentAddButton.js";
import { ROUTE_DOCUMENTS } from "../utils/contants.js";

export default function DocumentList({ $target, initialState , onDelete}) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);
  $documentList.className = 'document-list';

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.renderDocument();
  };

  this.renderDocument = () => {
    $documentList.innerHTML = `
    <ul>
        ${this.state
          .map((item) => `<li data-id=${item.id}>${item.title||"제목 없음"}
          <button class="delete">🗑</button>
          </li>`)
          .join("")}
    </ul>
`;
  }
  // this.render = () => {
  //   $documentList.innerHTML = `
  //           <ul>
  //               ${this.state
  //                 .map((item) => `<li data-id=${item.id}>${item.title||"제목 없음"}
  //                 <button class="delete">🗑</button>
  //                 </li>`)
  //                 .join("")}
  //           </ul>
  //       `;
  // };
  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    if ($li) {
      push(`${ROUTE_DOCUMENTS}/${parseInt(id)}`);
    }
    if (e.target.className === "delete") {
      onDelete(id)
    }
    
  });

  this.renderDocument();
}
