import { postData } from "../utils/fetchData.js";
import { setFlatSideBarData } from "../utils/storage.js";
import {
  appendPostToSideBar,
  documentTreeToHTML,
} from "../utils/dataManager.js";
import { pushHistoryById } from "../utils/router.js";

export default function SideBar({ $target, initialState, setPostIdState }) {
  const $div = document.createElement("div");
  $div.id = "sidebar";
  $target.appendChild($div);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    setFlatSideBarData(this.state);
    this.render();
  };

  $div.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
      const data = {
        title: "New",
        parent: e.target.id,
      };
      const resultData = await postData(data);

      this.setState(appendPostToSideBar(this.state, resultData, e.target.id));
      setPostIdState(resultData.id);
      pushHistoryById(resultData.id);
    } else if (e.target.tagName === "LI") {
      setPostIdState(e.target.id);
      pushHistoryById(e.target.id);
    }
  });

  this.render = () => {
    $div.innerHTML =
      "<button id='null'>new</button>" + documentTreeToHTML(this.state);
  };

  this.render();
}
