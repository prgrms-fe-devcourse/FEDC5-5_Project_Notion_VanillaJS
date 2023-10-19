import { ROOT_DOCUMETS_URL, HEADER_OPTION } from "../utils/fetchData.js";
import {
  getDocumentsWithValidation,
  postDocumentWithValidation,
  postData,
} from "../utils/fetchData.js";
export default function SideBar({ $target, initialState, pushIdForEditor }) {
  const $div = document.createElement("div");
  $div.id = "sidebar";
  $target.appendChild($div);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $div.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
      const data = {
        title: "",
        parent: e.target.id,
      };
      postData(data).then((data) => {
        pushIdForEditor(data.id);
      });
    } else if (e.target.tagName === "LI") {
      pushIdForEditor(e.target.id);
    }
  });

  this.render = () => {
    $div.innerHTML =
      documentTreeToHTML(this.state) + "<button id='null'>+</button>";
  };

  this.render();
}

function documentTreeToHTML(data) {
  const result = data.map((item) => {
    let HtmlResult = `<li id=${item.id}>${item.title}</li><button id=${item.id}>+</button>`;
    if (item.documents.length > 0) {
      HtmlResult += "<ul>" + documentTreeToHTML(item.documents) + "</ul>";
    }
    return HtmlResult;
  });

  return "<ul>" + result.join("") + "</ul>";
}
