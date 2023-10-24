import { postData } from "../utils/fetchData.js";

import { appendEditingPostToSideBar } from "../utils/dataManager.js";
import { pushHistoryById } from "../utils/router.js";
export default function SideBar({ $target, initialState, setPostIdState }) {
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
        this.setState(
          appendEditingPostToSideBar(this.state, data, e.target.id)
        );
        setPostIdState(data.id);
        pushHistoryById(data.id);
      });
    } else if (e.target.tagName === "LI") {
      setPostIdState(e.target.id);
      pushHistoryById(e.target.id);
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
    let HtmlResult = `<div><li id=${item.id}>${item.title}</li><button id=${item.id}>+</button></div>`;
    if (item.documents.length > 0) {
      HtmlResult += "<ul>" + documentTreeToHTML(item.documents) + "</ul>";
    }
    return HtmlResult;
  });

  return "<ul>" + result.join("") + "</ul>";
}
